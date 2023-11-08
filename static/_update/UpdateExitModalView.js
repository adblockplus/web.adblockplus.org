import Events from "./events.js";
import { getDollarString } from "./currency.js";

export default class UpdateExitModalView {

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
    parent.querySelector(".update-exit-modal__amount").textContent = getDollarString(options.currency, options.amount);
    parent.querySelector(".update-exit-modal__button--checkout").addEventListener("click", event => {
      event.preventDefault();
      this.events.fire("submit", this.options);
    });
    parent.querySelector(".update-exit-modal__button--close").addEventListener("click", event => {
      event.preventDefault();
      this.setOpen(false);
    });
  }

  setSubmitting (submitting) {
    if (submitting) {
      this.parent.classList.add("update-exit-modal--submitting")
      this.parent.querySelectorAll(".update-exit-modal__button").forEach(button => {
        button.dataset.innerHTML = button.innerHTML;
        button.innerHTML = `<div class="update-exit-modal__loader"></div>`;
        button.disabled = true;
      });
    } else {
      this.parent.classList.remove("update-exit-modal--submitting");
      this.parent.querySelectorAll(".update-exit-modal__button").forEach(button => {
        if (button.dataset.innerHTML) {
          button.innerHTML = button.dataset.innerHTML;
        }
        button.disabled = false;
      });
    }
  }

  setOpen(open) {
    this.parent.classList[open ? "add" : "remove"]("update-exit-modal--open");
    this.events.fire(open ? "open" : "close", this.options);
  }
  
}