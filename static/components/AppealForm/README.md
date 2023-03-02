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
  searchParameters: URLSearchParameters,
  settings: {
    language: "2 or 5 char locale code",
    country: "2 char country code",
  },
  strings: {
    string__id: string__value // BEM format is recommended
  }
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
  "appeal-form__error--once": "Please pay at least $5 to cover fees.",
  "appeal-form__error--monthly": "Please pay at least $2 to cover fees.",
  "appeal-form__error--yearly": "Please pay at least $5 to cover fees.",
  "appeal-form-checkout__submit": "Checkout now",
  "appeal-form-checkout__title": "Adblock Plus Contribution",
});
```

See `/includes/AppealForm/configuration.tmpl` for example.

### Markup on page

- See `/includes/AppealForm/skeleton.html`
    - A skeleton container (an element to replace with the form) is required but a fully blown placeholder like the one in `/includes/AppealForm/skeleton.html` is not required
- See `/includes/AppealForm/templates.html`
    - These templates must be on the page to add AppealForm(s) to the page. Their markup is not very flexible without changing `/static/components/AppealForm.js`

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
      1. Then enable AppealForm again

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
npx esbuild --bundle ./path/to/AppealForm/controller.jss --outfile=./path/to/AppealForm/bundle.js
```

(Optionally pass --minify and --sourcemap if you wish.)

### Building into an es5 bundle

```bash
npx webpack-cli bundle ./path/to/AppealForm/controller.js -o ./path/to/AppealForm/ --mode production
```

(You must develop a webpack config if you want to control this build more granularly.)