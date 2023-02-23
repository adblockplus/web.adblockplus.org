# AppealForm

```txt
Name a fair price: [USD]

Pay once:               Or monthly:                   Or yearly:
* $10  * $15  * $20   | * $1.99  * $2.99  * $3.99   | * $10  * $15  * $20
* $35  * $50  * [$35] | * $4.99  * $9.99  * [$4.99] | * $35  * $50  * [$35]

[ Checkout Now ] Visa Mastercard PayPal APay GPay AMEX
```

## Configuration

### Global page configuration

```js
window.adblock = {
  settings: {
    language: "2 or 5 char locale code",
    currency: "3 uppercase char currency code",
  },
  strings: {
    "error--unexpected": "An unexpected critical error message"
  }
  error: (message) => { /* handle unexpected critical error here */ }
  searchParameters: URLSearchParameters,
}
```

See `/includes/config.tmpl` for example.

### Global page configuration extended for AppealForm

```js
Object.assign(window.adblock.strings, {
  "appeal-form-header__heading": "Name a fair price:",
  "appeal-form-frequency__heading--once": "Pay once:",
  "appeal-form-frequency__heading--monthly": "Or monthly:",
  "appeal-form-frequency__heading--yearly": "Or yearly:",
  "appeal-form__error--once": "Please pay at least <span class=\"amount\"></span> to cover fees.",
  "appeal-form__error--monthly": "Please pay at least <span class=\"amount\"></span> to cover fees.",
  "appeal-form__error--yearly": "Please pay at least <span class=\"amount\"></span> to cover fees.",
  "appeal-form-checkout__submit": "Checkout now",
  "appeal-form-checkout__title": "Adblock Plus Contribution",
});
```

See `/includes/AppealForm/configuration.tmpl` for example.

### Markup on page

A placeholder is required.

```html
<div class="appeal-form"></div>
```

The placeholder may contain a loading skeleton of the form. e.g.

```html
<div class="appeal-form appeal-form--skeleton" role="presentation" aria-hidden="true">
  <div style="padding-top: .5rem;">
    <div class="appeal-form__placeholder" style="height: 2rem; width: 100%; max-width: 16rem;"></div>
  </div>
  <div class="appeal-form-frequencies" style="max-width: 50rem; margin-top: 0.25rem; margin-bottom: 0.25rem;">
    <div class="appeal-form-frequency" style="padding-bottom: 0;">
      <div class="appeal-form__placeholder" style="height: 5.5rem; width:100%;"></div>
    </div>
    <div class="appeal-form-frequency" style="padding-bottom: 0;">
      <div class="appeal-form__placeholder" style="height: 5.5rem; width:100%;"></div>
    </div>
    <div class="appeal-form-frequency" style="padding-bottom: 0;">
      <div class="appeal-form__placeholder" style="height: 5.5rem; width:100%;"></div>
    </div>
  </div>
  <div style="padding-top: 0; margin-bottom: 2.5rem">
    <div class="appeal-form__placeholder" style="height: 2rem; width: 100%; max-width: 33rem;"></div>
  </div>
</div>
```

See `/includes/AppealForm/skeleton.html` for example.

The following templates are required and not very flexible without modifying the component:

```html
<template id="appeal-form">
  <form class="appeal-form">
    <header class="appeal-form-header">
      <h2 class="appeal-form-header__heading"></h2>
      <select class="appeal-form-header__select"></select>
    </header>
    <div class="appeal-form-frequencies"></div>
    <div class="appeal-form__error" hidden></div>
    <div class="appeal-form-checkout">
      <button class="appeal-form-checkout__submit">
        <img alt="" src="/components/AppealForm/appeal-form-checkout__icon.png" class="appeal-form-checkout__icon">
        <span></span>
      </button>
      <img alt="" src="/components/AppealForm/appeal-form-checkout__image.svg" class="appeal-form-checkout__image">
    </div>
  </form>  
</template>

<template id="appeal-form-frequency">
  <div class="appeal-form-frequency">
    <h3 class="appeal-form-frequency__heading"></h3>
    <div class="appeal-form-amounts"></div>
  </div>  
</template>

<template id="appeal-form-amount--fixed">
  <label class="appeal-form-amount appeal-form-amount--fixed">
    <input type="radio" name="appeal-form-amount__radio" class="appeal-form-amount__radio">
    <span class="appeal-form-amount__text"></span>
  </label>  
</template>

<template id="appeal-form-amount--custom">
  <label class="appeal-form-amount appeal-form-amount--custom">
    <input type="radio" name="appeal-form-amount__radio" class="appeal-form-amount__radio" value="custom">
    <input type="number" step=".01" class="appeal-form-amount__input">
  </label>  
</template>
```

See `/includes/AppealForm/templates.html` for example.

### Configuration in implementation/build of the component

```js
export const CONFIGURATION = {
  AppealForm: {
    currency: "Currency code of initially selected currency",
    selected: "Index of initially selected amount"
  },
  Paddle: {
    sandbox: {
      vendor: "Vendor ID",
      products: {
        "Currency code": {
          "once": {
            "Integer amount in cents": "Product ID",
            /* ... */
            "custom": "Minimum amount for custom amount input"
          },
          "monthly": { /* ... */ },
          "yearly": { /* ... */ }
        }
      }
    },
    live: { /* same as sandbox */ }
  }
}
```

See `/static/components/AppealForm/configuration.js` for example.

### Initialisation / controlling the component

The AppealForm component is expecting to be initialised / controlled roughly as follows:

1. Set/Resolve paddle configuration
    1. Initial currency and amount selected (see example above)
    1. Sandbox or live paddle environment (see example above)
1. Setup Paddle
1. Construct AppealForm with Paddle and AppealForm configuration
1. Add an AppealForm submit callback
1. On AppealForm submit
    1. Disable AppealForm
    1. Do whatever you need to do with AppealForm submit data
    1. Checkout with Paddle
      1. Then enable AppealForm again, if applicable

See `/static/components/AppealForm/controller.js` for example.

## AppealForm Public API

AppealForm instances have the following public API:

### onSubmit(callback)

Call a function with submission data on submit.

```
submissionData = {
  currency: "currency code string",
  frequency: "(once|monthly|yearly)",
  amount: "amount integer in cents",
  product: "paddle product ID"
}
```

### disable()

Set the form state to disabled (affects UI and functionality).

### enable()

Set the form state to enabled (affects UI and functionality).

## Bundling

AppealForm is written using ES6 modules. Therefore, you can import it's entry
point into your JavaScript bundle or load it as a script module.

### Example importing into project bundle

`/path/to/project/bootstrap.js`

```js
import './path/to/AppealForm/controller.js'
/* ... */
```

### Example loading via script module

```html
<!-- ... -->
<script type="module" src="/path/to/AppealForm/controller.js">
```

---

If your project uses an older module/building system or no build system at all
then you can build AppealForm into an es6 bundle using esbuild or an es5 bundle
using webpack like so:

### Build into an es6 bundle

```bash
npx esbuild --bundle ./path/to/AppealForm/controller.js --outfile=./path/to/AppealForm/bundle.js
```

(Optionally pass --minify and --sourcemap if you wish.)

### Building into an es5 bundle

```bash
npx webpack-cli bundle ./path/to/AppealForm/controller.js -o ./path/to/AppealForm/ --mode development --devtool hidden-source-map
```

See `./path/to/AppealForm/main.js`.
