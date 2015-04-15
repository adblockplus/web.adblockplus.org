/*
 * This file is part of the Adblock Plus website,
 * Copyright (C) 2006-2015 Eyeo GmbH
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

var optionsRegExp = /$(~?[\w\-]+(?:,~?[\w\-]+)*)$/;
var whitelistRegExp = /^@@/;
var regexpRegExp = /^\/(.*)\/$/;

function mergeStrings(strings1, strings2) {
  var result = [];
  for (var i = 0; i < strings1.length; i++) {
    var str1 = strings1[i];
    for (var j = 0; j < strings2.length; j++) {
      var str2 = strings2[j];
      if (str1.length > 1 && str1[str1.length - 1] == "|" && str2.length)
        continue;
      if (str2.length > 1 && str2[0] == "|" && str1.length)
        continue;
      result.push(str1 + str2);
    }
  }
  return result;
}

function findEnding(str, startPos, endChar) {
  for (var i = startPos + 1; i < str.length; i++) {
    if (str[i] == endChar)
      return i;
    else if (str[i] == "\\")
      i++;
    else if (str[i] == "(" && endChar != "]")
      i = findEnding(str, i, ")");
    else if (str[i] == "[" && endChar != "]")
      i = findEnding(str, i, "]");
    else if (str[i] == "{" && endChar != "]")
      i = findEnding(str, i, "}");

    if (i == -1)
      return i;
  }
  return -1;
}

function processCharClass(expression) {
  var result = [];
  for (var i = 0; i < expression.length; i++) {
    if (expression[i] == "-" && result.length && i + 1 < expression.length) {
      var fromCode = result[result.length - 1].charCodeAt(0) + 1;
      var toCode = expression[i + 1].charCodeAt(0);
      for (var j = fromCode; j <= toCode; j++)
        result.push(String.fromCharCode(j));
      i++;
    }
    else
      result.push(expression[i]);
  }

  return result;
}

function processExpression(expression) {
  var result = [];
  var curStrings = [""];

  for (var i = 0; i < expression.length; i++) {
    if (expression[i] == "|") {
      result = result.concat(curStrings);
      curStrings = [""];
    }
    else if (expression[i] == "^" || expression[i] == "$")
      curStrings = mergeStrings(curStrings, ["|"]);
    else if (expression[i] == "\\") {
      if (i == expression.length - 1)
        return null;
      if (/[\*\|bBcdDfnrsStvwW\dxu]/.test(expression[i + 1]))
        return null;

      if (i + 2 < expression.length && expression[i + 2] == "?") {
        curStrings = mergeStrings(curStrings, expression[++i]).concat(curStrings);
        i++;
      }
      else
        curStrings = mergeStrings(curStrings, expression[++i]);
    }
    else if (expression[i] == ".") {
      if (i == expression.length - 1 || expression[i + 1] != "*")
        return null;

      curStrings = mergeStrings(curStrings, "*");
      i++;
    }
    else if (expression[i] == "(") {
      var endPos = findEnding(expression, i, ")");
      if (endPos == -1)
        return null;

      var contents = expression.substring(i + 1, endPos);
      if (contents.length >= 2 && contents[0] == "?" && /[:=!]/.test(contents[1]))
        return null;

      contents = processExpression(contents);
      if (!contents)
        return null;

      if (endPos + 1 < expression.length && expression[endPos + 1] == "?") {
        curStrings = mergeStrings(curStrings, contents).concat(curStrings);
        i = endPos + 1;
      }
      else {
        curStrings = mergeStrings(curStrings, contents);
        i = endPos;
      }
    }
    else if (expression[i] == "[") {
      var endPos = findEnding(expression, i, "]");
      if (endPos == -1)
        return null;

      var contents = expression.substring(i + 1, endPos);
      if (contents.length >= 1 && contents[0] == "^")
        return null;

      contents = processCharClass(contents);
      if (!contents)
        return null;

      if (endPos + 1 < expression.length && expression[endPos + 1] == "?") {
        curStrings = mergeStrings(curStrings, contents).concat(curStrings);
        i = endPos + 1;
      }
      else {
        curStrings = mergeStrings(curStrings, contents);
        i = endPos;
      }
    }
    else if (expression[i] == "*" || expression[i] == "+" || expression[i] == "?" || expression[i] == "{")
      return null;
    else {
      if (i + 1 < expression.length && expression[i + 1] == "?")
        curStrings = mergeStrings(curStrings, expression[i++]).concat(curStrings);
      else
        curStrings = mergeStrings(curStrings, expression[i]);
    }
  }
  result = result.concat(curStrings);

  result.sort();
  for (i = 1; i < result.length; i++)
    if (result[i] == result[i - 1])
      result.splice(i--, 1);

  return result;
}

function checkFilter(filter) {
  var regexp = filter;

  var prefix = "";
  regexp = regexp.replace(whitelistRegExp, function(match) {prefix = match; return ""});
  var suffix = "";
  regexp = regexp.replace(optionsRegExp, function(match) {suffix = match; return ""});

  if (!regexpRegExp.test(regexp))
    return [filter];    // Filter is not a regexp, leave it unchanged

  regexp = RegExp.$1;
  result = processExpression(regexp);
  if (result) {
    for (var i = 0; i < result.length; i++) {
      if (result[i].length >= 2 && result[i][0] == "/" && result[i][result[i].length - 1] == "/")
        result[i] = "*" + result[i];
      result[i] = prefix + result[i] + suffix;
    }
    return result;
  }
  else
    return [filter];
}

function clearResults() {
  var results = document.getElementById("results");
  while (results.firstChild)
    results.removeChild(results.firstChild);
  results.style.display = "none";

  document.getElementById("resultsLink").parentNode.className = "hidden";
}

function doCheck() {
  clearResults();

  var filters = document.getElementById("filters").value.replace("\r", "").split("\n");
  var results = [];
  for (var i = 0; i < filters.length; i++) {
    if (!/\S/.test(filters[i]) || /\[Adblock(?:\s*Plus\s*([\d\.]+)?)?\]/i.test(filters[i]))
      continue;

    results = results.concat(checkFilter(filters[i]));
  }
  printResults(results);
}

function printResults(ret) {
  var resultsLink = document.getElementById("resultsLink");
  resultsLink.href = "data:text/plain," + encodeURIComponent("[Adblock]\n" + ret.join("\n"));
  resultsLink.parentNode.className = "";

  var results = document.getElementById("results");
  results.appendChild(document.createTextNode(ret.join("\n")));
  results.style.display = "";
}
