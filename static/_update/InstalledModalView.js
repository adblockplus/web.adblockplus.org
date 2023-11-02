import Events from "./events.js";
import { getDollarString } from "./currency.js";

export default class InstalledModalView {

  /**
   * @param {Element} parent - parent element
   * @param {object} options 
   * @param {string} options.currency - 3 letter currency
   * @param {string} options.amount - amount in cents (if the currency has cents)
   * @param {string} options.product - paddle product ID
   */
  constructor(parent, options) {
    this.parent = parent;
    this.options = options;
    this.events = new Events();
    this.loading = false;
    parent.querySelector(".checkout-button__amount").textContent = getDollarString(options.currency, options.amount);
    parent.querySelector(".installed-modal__button--checkout").addEventListener("click", event => {
      event.preventDefault();
      this.events.fire("submit", this.options);
    });
    parent.querySelector(".installed-modal__button--close").addEventListener("click", event => {
      event.preventDefault();
      this.open = false;
    });
  }

  get submitting () {
    return this.parent.classList.contains("installed-modal--submitting");
  }

  set submitting (submitting) {
    if (submitting) {
      this.parent.classList.add("installed-modal--submitting")
      this.parent.querySelectorAll(".installed-modal__button").forEach(button => {
        button.dataset.innerHTML = button.innerHTML;
        button.innerHTML = `<div class="installed-modal__loader"></div>`;
        button.disabled = true;
      });
    } else {
      this.parent.classList.remove("installed-modal--submitting");
      this.parent.querySelectorAll(".installed-modal__button").forEach(button => {
        if (button.dataset.innerHTML) {
          button.innerHTML = button.dataset.innerHTML;
        }
        button.disabled = false;
      });
    }
  }

  get open() {
    return this.parent.classList.contains("installed-modal--open");
  }

  set open(open) {
    this.parent.classList[open ? "add" : "remove"]("installed-modal--open");
    this.events.fire(open ? "open" : "close", this.options);
  }
  
}