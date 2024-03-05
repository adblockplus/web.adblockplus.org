
function generateLink()
{
  var form = document.getElementById("linkForm");
  var title = document.getElementById("title");
  var location = document.getElementById("location");
  var requiresTitle = document.getElementById("requiresTitle");
  var requiresLocation = document.getElementById("requiresLocation");
  var result = document.getElementById("result");
  var link = document.getElementById("result_link");
  var pre = document.getElementById("result_code");

  if (!/\S/.test(location.value)) {
    alert(form.getAttribute("nolocationerror"));
    location.focus();
    return;
  }

  var url = "https://subscribe.adblockplus.org?location=" +
    encodeURIComponent(location.value);
  if (/\S/.test(title.value))
    url += "&title=" + encodeURIComponent(title.value);

  if (/\S/.test(requiresTitle.value) && /\S/.test(requiresLocation.value))
    url += "&requiresLocation=" + encodeURIComponent(requiresLocation.value) + "&requiresTitle=" + encodeURIComponent(requiresTitle.value);

  link.href = url;
  var linkTitle = link.firstChild.nodeValue;

  while (pre.firstChild)
    pre.removeChild(pre.firstChild);
  pre.appendChild(document.createTextNode("<a href=\"" + url.replace(/&/g, "&amp;") + "\">" + linkTitle + "</a>"));

  result.className = "";
  pre.style.display = "";
}
