  (function()
  {
    var adblockersList = null;
    function toggleView(element)
    {
      var targetId = element.getAttribute("data-toggle-view");
      if (targetId)
        document.getElementById(targetId).classList.toggle("hidden");
    }

    function checkSelectedAdblocker()
    {
      var selectedOption = adblockersList[adblockersList.selectedIndex];
      var element = selectedOption.getAttribute("data-show-element");
      if (element)
        document.getElementById(element).classList.remove("hidden");
      else
      {
        element = selectedOption.getAttribute("data-hide-element");
        document.getElementById(element).classList.add("hidden");
      }
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

      adblockersList = document.querySelector("#adblockers select");
      adblockersList.addEventListener("change", function()
      {
        checkSelectedAdblocker();
      }, false);
      checkSelectedAdblocker();

      var reasonOtherInput = document.getElementById("reason-other-input");
      var maxLength = reasonOtherInput.getAttribute("maxlength");
      var charCounter = document.getElementById("characters-countdown");
      charCounter.textContent = maxLength;
      reasonOtherInput.addEventListener("keyup", function()
      {
        charCounter.textContent = maxLength - reasonOtherInput.value.length;
      }, false);

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
