(function()
{
  var adblockersList = null;
  function toggleView(element)
  {
    var targetId = element.getAttribute("data-toggle-view");
    if (targetId)
      document.getElementById(targetId).classList.toggle("hidden");
  }

  function init()
  {
    var form = document.getElementById("reasons-form");

    // Create hidden input for GET parameters
    window.location.search.substr(1).split("&").forEach(function(param)
    {
      if (!/.=./.test(param))
        return;

      var paramSplit = param.split("=");
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", decodeURIComponent(paramSplit[0]));
      input.setAttribute("value", decodeURIComponent(paramSplit[1]));
      form.appendChild(input);
    });

    // Randomly add reasons
    var reasonsContainer = document.getElementById("reasons");
    var reasons = document.querySelectorAll("#reasons > li");
    reasons = Array.prototype.slice.call(reasons);
    reasonsContainer.innerHTML = "";
    while (reasons.length)
    {
      var randomIndex = Math.floor(Math.random() * (reasons.length -1));
      var reasonElement = reasons.splice(randomIndex, 1)[0];
      reasonsContainer.appendChild(reasonElement);
      var checkbox = reasonElement.querySelector("input[type=checkbox]");
      if (checkbox.checked)
        toggleView(checkbox);

      checkbox.addEventListener("change", function(event)
      {
        toggleView(event.target);
      }, false);
    }

    function inputChararcterCounter(inputId, counterField)
    {
      var reasonOtherInput = document.getElementById(inputId),
          maxLength = reasonOtherInput.getAttribute("maxlength"),
          charCounter = document.querySelector(counterField);

      charCounter.textContent = maxLength;

      reasonOtherInput.addEventListener("keyup", function()
      {
        charCounter.textContent = maxLength - reasonOtherInput.value.length;
      }, false);
    }

    inputChararcterCounter(
      "reason-other-input",
      "#reason-other-container .characters-countdown");
    inputChararcterCounter(
      "reason-stillads-input",
      "#reason-stillads-container .characters-countdown");

    var submitButton = document.getElementById("reason-submit");
    submitButton.addEventListener("click", function(event)
    {
      if (!document.querySelector("ul input:checked"))
      {
        event.preventDefault();
        form.setAttribute("class", "error");
      }
      else
      {
        form.submit();
      }
    }, false);
  }
  document.addEventListener("DOMContentLoaded", init, false);
})();
