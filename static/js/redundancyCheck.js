/*
 * This file is part of the Adblock Plus website,
 * Copyright (C) 2006-2016 Eyeo GmbH
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

var strings;
var list;
var redundancies;

// Utils module emulation
Utils = {
  getString: function(id)
  {
    return id;
  }
}

// IE doesn't support __defineGetter__, run memoization handlers immediately
if (!("__defineGetter__" in {}))
{
  Object.prototype.__defineGetter__ = function(prop, handler)
  {
    this[prop] = handler.call(this);
  }
}

function setStatus(status)
{
  var span = document.getElementById("status");
  while (span.firstChild)
    span.removeChild(span.firstChild);
  span.appendChild(document.createTextNode(status));

  span.parentNode.className = "";
}

function clearResults() {
  var report = document.getElementById("report");
  while (report.firstChild)
    report.removeChild(report.firstChild);

  var results = document.getElementById("results");
  while (results.firstChild)
    results.removeChild(results.firstChild);
  results.style.display = "none";

  document.getElementById("resultsLink").parentNode.className = "hidden";
}

function addToReport(line) {
  var report = document.getElementById("report");
  var entry = document.createElement("li");
  entry.appendChild(document.createTextNode(line));
  report.appendChild(entry);
}

function doCheck()
{
  clearResults();
  strings = document.getElementById("strings");
  list = [];
  redundancies = {};
  setStatus(strings.getAttribute("statusParsing"));
  setTimeout(parseStep, 0);
}

function parseStep()
{
  var filters = document.getElementById("filters").value.replace(/\r/g, "").split("\n")
  for (var i = 0; i < filters.length; i++)
  {
    var filterText = filters[i];
    if (!/\S/.test(filterText) || /\[Adblock(?:\s*Plus\s*([\d\.]+)?)?\]/i.test(filterText))
      continue;

    var filter = Filter.fromText(filterText);
    if (!filter || filter instanceof InvalidFilter)
      addToReport(strings.getAttribute("reportInvalid").replace(/\{filter\}/, filter.text));
    else
      list.push(filter);
  }

  for (var i = 0; i < list.length; i++)
  {
    var filter = list[i];
    if (filter instanceof RegExpFilter && !Filter.regexpRegExp.test(filter.text))
    {
      var testString = filter.text;
      testString = testString.replace(Filter.optionsRegExp, "");
      testString = testString.replace(/^@@/, "");

      if (/^\|\|/.test(testString))
        testString = testString.replace(/^\|\|/, "---://\uFFFF.");
      else if (/^\|/.test(testString))
        testString = testString.replace(/^\|/, "");
      else
        testString = "*" + testString;
      if (/\|$/.test(testString))
        testString = testString.replace(/\|$/, "");
      else
        testString = testString + "*";

      testString = testString.replace(/\*+/g, "\uFFFF");
      testString = testString.replace(/\^/g, "\0");

      filter.testString = testString;
      filter.testStringU = testString.toUpperCase();
      filter.testStringL = testString.toLowerCase();
    }
  }

  processFilter(0);
}

var current;

function processFilter(nextFilter)
{
  if (list.length > nextFilter)
  {
    current = nextFilter;
    setStatus(strings.getAttribute("statusTesting").replace(/\{current\}/, nextFilter + 1).replace(/\{count\}/, list.length));
    setTimeout(testFilter, 0, current);
  }
  else
  {
    setStatus(strings.getAttribute("statusPrinting"));
    setTimeout(printResults, 0);
  }
}

function testFilter()
{
  if (list[current] instanceof RegExpFilter)
  {
    for (var i = 0; i < list.length; i++)
    {
      if (i == current || !("testString" in list[i]))
        continue;

      if ((list[current] instanceof BlockingFilter) != (list[i] instanceof BlockingFilter))
        continue;

      if (list[current].regexp.test(list[i].testString))
      {
        if (list[current].matchCase && !list[i].matchCase &&
            (!list[current].regexp.test(list[i].testStringU) ||
             !list[current].regexp.test(list[i].testStringL)))
        {
          continue;
        }

        if ((list[i].contentType & ~list[current].contentType) > 0)
          continue;

        var redList = (i in redundancies ? redundancies[i] : []);
        redList.push(current);
        redundancies[i] = redList;
        redundancies[current + "=>" + i] = true;
      }
    }
  }

  processFilter(current + 1);
}

function printResults()
{
  var ret = [];
  for (var i = 0; i < list.length; i++) {
    var redundantBy = null;
    if (i in redundancies)
    {
      var redList = redundancies[i];
      for (var j = 0; j < redList.length; j++)
      {
        var k = redList[j];
        var cycle = (i + "=>" + k in redundancies);
        if (!cycle || list[k].text.length < list[i].text.length || (list[k].text.length == list[i].text.length && k < i))
          redundantBy = list[k];
      }
    }
    if (redundantBy)
      addToReport(strings.getAttribute("reportRedundant").replace(/\{filter1\}/, list[i].text).replace(/\{filter2\}/, redundantBy.text));
    else
      ret.push(list[i].text);
  }

  var resultsLink = document.getElementById("resultsLink");
  resultsLink.href = "data:text/plain," + encodeURIComponent("[Adblock]\n" + ret.join("\n"));
  resultsLink.parentNode.className = "";

  var results = document.getElementById("results");
  results.appendChild(document.createTextNode(ret.join("\n")));
  results.style.display = "";

  if (!document.getElementById("report").firstChild)
    addToReport(strings.getAttribute("reportNothingFound"));
  setStatus(strings.getAttribute("statusFinished"));
}
