/*
 * This file is part of the Adblock Plus website,
 * Copyright (C) 2006-2017 eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

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

  var url = "abp:subscribe?location=" + encodeURIComponent(location.value);
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
