/* global adblock */
(function () {

  // Shared
  //////////////////////////////////////////////////////////////////////////////

  // Setup shared query object
  const query = new URLSearchParams(location.search);

  // Exclude all non test param requests
  if (!query.has("test")) return;

  // Setup shared parent element
  const parent = document.createElement("div");
  parent.id = "test";
  parent.className = "content container section";
  document.body.insertBefore(parent, document.querySelector("main"));

  // Setup Paddle
  Paddle.Environment.set('sandbox');
  Paddle.Setup({ vendor: 11004 });

  /** AdBlock generate userid function */
  function generateUserId() {
    const timestamp = (Date.now()) % 1e8; // 8 digits from end of timestamp
    const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const generatedChars = [];
    for (let i = 0; i < 8; i++) {
      const randomCharIndex = Math.floor(Math.random() * allowedChars.length);
      generatedChars.push(allowedChars[randomCharIndex]);
    }
    return generatedChars.join('') + timestamp;
  }

  // Checkout
  //////////////////////////////////////////////////////////////////////////////

  const checkoutButton = document.createElement("button");
  checkoutButton.className = "button primary";
  checkoutButton.textContent = "Checkout";
  parent.appendChild(checkoutButton);

  checkoutButton.addEventListener("click", event => {
    const userid = generateUserId();
    const params = new URLSearchParams();
    params.set("test", true);
    params.set("checkout__success", true);
    params.set("checkout__userid", userid);
    Paddle.Checkout.open({
      title: "test",
      product: 55427,
      allowQuantity: false,
      success: `${location.origin}${location.pathname}?${params.toString()}`,
      locale: "en",
      passthrough: {
        "testmode": false,
        "userid": userid,
        "tracking": "ME X0G0 FEOMSHME " + userid,
        "locale": "en",
        "country": "unknown",
        "ga_id": "",
        "premium": false,
        "premium_cid": "0",
        "premium_sid": "0",
        "currency": "USD",
        "recurring": true,
        "subType": "monthly",
        "experiment": "",
        "experiment_id": "",
        "variant": "",
        "variant_index": -1,
        "amount_cents": 200,
        "cancel_url": location.href
      }
    });
  });

  // Activation
  //////////////////////////////////////////////////////////////////////////////

  if (query.has("checkout__success") && query.has("checkout__userid")) {
    let resolved = false;
    setTimeout(() => { if (!resolved) alert("activation__timeout"); }, 10000);
    window.addEventListener("message", response => {
      console.log("message", response);
      if (response && response.data && typeof response.data.ack == "boolean") {
        if (response.data.ack) {
          resolved = true;
          alert("activation__success");  
        } else {
          resolved = true;
          alert("activation__failure");  
        }
      }
    });
  
    window.postMessage({
      command: "payment_success",
      userId: query.get("checkout__userid"),
      version: 1,
    });
  }

})();