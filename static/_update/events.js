export default class Events {

  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  fire(event, context) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(context));
    }
  }

}