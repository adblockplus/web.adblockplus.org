export async function testCheckoutAmount(page, checkoutParameters) {
    await page.evaluate((checkoutParameters) => {
      return new Promise((resolve, reject) => {
        adblock.events.on("Paddle.Checkout.Loaded", event => {
          let ourNumber, theirNumber;
          try {
            ourNumber = adblock.lib.getDollarNumber(checkoutParameters.currency, checkoutParameters.amount);
            theirNumber = event.eventData.checkout.prices.customer.items[0].display_price.line_price.net;
            if (ourNumber != theirNumber) throw new Error();
          } catch (error) {
            reject(JSON.stringify({
              from: "Paddle.Checkout.Loaded",
              message: "event data or price mismatch",
              comparison: { ourNumber, theirNumber, },
              checkoutParameters,
              error,
              event,
            }));
          }
          resolve();
        });
        adblock.lib.checkout(checkoutParameters)
        .catch(error => reject(JSON.stringify({from: "adblock.lib.checkout", message: "checkout promise rejected", checkoutParameters, error, })));
      });
    }, checkoutParameters);
}
