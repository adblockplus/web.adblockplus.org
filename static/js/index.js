(function()
{
  function addListener(obj, type, listener, useCapture)
  {
    if ("addEventListener" in obj)
    {
      obj.addEventListener(type, function(ev)
      {
        if (listener(ev) === false)
          ev.preventDefault();
      }, useCapture);
    }
    else
    {
      // IE 8
      if (type == "DOMContentLoaded")
        type = "readystatechange";

      type = "on" + type;
      if ("attachEvent" in obj)
      {
        obj.attachEvent(type, function()
        {
          if (document.readyState == "complete" && listener(event) === false)
            event.returnValue = false;
        });
      }
      else
      {
        obj[type] = listener;
      }
    }
  }

  function addPlaceholder(textbox)
  {
    textbox.setAttribute("class", "placeholder");
    textbox.value = getPlaceholderText(textbox);
  }

  function getPlaceholderText(textbox)
  {
    return textbox.getAttribute("placeholder");
  }

  function initSubscriptionForm(subscriptionElement)
  {
    var emailTextbox = subscriptionElement.querySelectorAll(".subscribe-textbox")[0];
    var reset = subscriptionElement.querySelectorAll(".reset-form")[0];

    // IE9 + Safari iOS
    if (!("placeholder" in document.createElement("input"))
        && !emailTextbox.value)
    {
      addPlaceholder(emailTextbox);
      addListener(emailTextbox, "focus", function()
      {
        if (emailTextbox.value == getPlaceholderText(emailTextbox))
        {
          emailTextbox.value = "";
          emailTextbox.setAttribute("class", "");
        }
      }, false);

      addListener(emailTextbox, "blur", function()
      {
        if (!emailTextbox.value)
          addPlaceholder(emailTextbox);
      }, false);
    }

    var formElement = subscriptionElement.getElementsByTagName("form")[0];
    addListener(formElement, "submit", function()
    {
      if (!window.XMLHttpRequest)
      {
        formElement.submit();
        return false;
      }

      var inputs = formElement.getElementsByTagName("input");
      var params = "";
      for (var i = 0; i < inputs.length; i++)
      {
        if (params)
          params += "&";
        params += inputs[i].name + "=" + encodeURIComponent(inputs[i].value);
      }      
      var request = new XMLHttpRequest();
      request.open("POST", "/submitEmail", true);
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      addListener(request, "readystatechange", function()
      {
        if (request.readyState == 4)
        {
          if (request.status >= 200 && request.status < 300)
          {
            formElement.setAttribute("class", "success");
          }
          else if (request.status == 400)
          {
            formElement.setAttribute("class", "invalid");
          }
          else
          {
            var errorWrapper = document.getElementById("response-error");
            if ("textContent" in errorWrapper)
              errorWrapper.textContent = request.statusText;
            else // IE8
              errorWrapper.innerText = request.statusText;

            formElement.setAttribute("class", "error");
          }
        }
      }, false);
      request.send(params);
      return false;
    }, false);

    addListener(reset, "click", function()
    {
      formElement.removeAttribute("class");
      return false;
    }, false);
  }

  var visibleTab;
  var container;

  window.toggleMore = function()
  {
    if (container.className == "hidden")
      container.className = visibleTab || getDefaultTab();
    else
      container.className = "hidden";
  }

  window.showTab = function(button)
  {
    var id = button.id.substr(5);
    container.className = id;
    visibleTab = id;
  }

  function getDefaultTab()
  {
    var content = document.getElementById("content");
    var ua = content.className.match(/ua\-([^\s]+)/);
    visibleTab = ua && ua[1] || "firefox";
    return visibleTab;
  }

  function init()
  {
    container = document.getElementById("more-container");
    initSubscriptionForm(document.getElementById("edge-subscription"));
  }

  init();
})();
