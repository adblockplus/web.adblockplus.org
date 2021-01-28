/* global eyeo */
// We don't track devices in the European Economic Area because of GDPR

if (typeof eyeo.triggerOptimizeComplete == "function")
  eyeo.triggerOptimizeComplete("b");

document.documentElement.classList.remove('async-hide');
