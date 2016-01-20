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

if (typeof window.addEventListener != "undefined") {
  window.addEventListener("load", initAnimations, false);
  document.addEventListener("click", loadAnimation, false);
}

var ns = "https://adblockplus.org/animation";
var loadPrefix = "animations/";
var loadSuffix = ".xml";

function initAnimations() {
  var list = document.getElementsByTagNameNS(ns, "animation");
  if (list.length == 0)
    list = document.getElementsByTagName("animation");  // HTML mode, Anwiki
  for (var i = 0; i < list.length; i++) {
    var node = list[i];
    if (!node.hasAttribute("name") || !node.hasAttribute("label"))
      continue;

    var animation = document.createElement("div");
    animation.setAttribute("class", "animation");
    animation.setAttribute("name", node.getAttribute("name"));
    animation.setAttribute("started", false);
    animation.style.margin = "5px";

    var link = document.createElement("a");
    link.appendChild(document.createTextNode(node.getAttribute("label")));
    animation.appendChild(link);

    node.parentNode.insertBefore(animation, node);
  }
}

function loadAnimation(event) {
  var animation = event.target;
  while (animation && animation.nodeType == 1 && animation.className != "animation")
    animation = animation.parentNode;

  if (!animation || animation.nodeType != 1 || animation.getAttribute("started") == "true")
    return;

  animation.setAttribute("started", "true");

  while (animation.firstChild)
    animation.removeChild(animation.firstChild);

  animation.style.border = "1px dashed black";
  animation.style.padding = "10px";
  animation.style.width = "50px";
  animation.style.height = "50px";

  var container = document.createElement("div");
  container.style.width = "0px";
  container.style.height = "0px";
  container.style.overflow = "visible";
  container.style.position = "relative";
  container.style.visibility = "hidden";

  var image = document.createElement("img");
  container.appendChild(image);
  animation.appendChild(container);

  image.onload = function() {
    container.style.left = Math.round((50 - image.width) / 2) + "px";
    container.style.top = Math.round((50 - image.height) / 2) + "px";
    container.style.visibility  = "";
  }
  image.src = "data:image/gif;base64,R0lGODlhGAAYAPQAAP%2F%2F%2FwCA%2F87m%2Fvr8%2FuDv%2FrDX%2Fujz%2Fo7G%2Fsjj%2FpzN%2Ftjr%2FqjT%2FsDf%2FvL4%2Fna6%2FobC%2Frjb%2Fmiz%2FgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2BGkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAHAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAGAAYAAAFriAgjiQAQWVaDgr5POSgkoTDjFE0NoQ8iw8HQZQTDQjDn4jhSABhAAOhoTqSDg7qSUQwxEaEwwFhXHhHgzOA1xshxAnfTzotGRaHglJqkJcaVEqCgyoCBQkJBQKDDXQGDYaIioyOgYSXA36XIgYMBWRzXZoKBQUMmil0lgalLSIClgBpO0g%2Bs26nUWddXyoEDIsACq5SsTMMDIECwUdJPw0Mzsu0qHYkw72bBmozIQAh%2BQQABwABACwAAAAAGAAYAAAFsCAgjiTAMGVaDgR5HKQwqKNxIKPjjFCk0KNXC6ATKSI7oAhxWIhezwhENTCQEoeGCdWIPEgzESGxEIgGBWstEW4QCGGAIJEoxGmGt5ZkgCRQQHkGd2CESoeIIwoMBQUMP4cNeQQGDYuNj4iSb5WJnmeGng0CDGaBlIQEJziHk3sABidDAHBgagButSKvAAoyuHuUYHgCkAZqebw0AgLBQyyzNKO3byNuoSS8x8OfwIchACH5BAAHAAIALAAAAAAYABgAAAW4ICCOJIAgZVoOBJkkpDKoo5EI43GMjNPSokXCINKJCI4HcCRIQEQvqIOhGhBHhUTDhGo4diOZyFAoKEQDxra2mAEgjghOpCgz3LTBIxJ5kgwMBShACREHZ1V4Kg1rS44pBAgMDAg%2FSw0GBAQGDZGTlY%2BYmpyPpSQDiqYiDQoCliqZBqkGAgKIS5kEjQ21VwCyp76dBHiNvz%2BMR74AqSOdVwbQuo%2Babppo10ssjdkAnc0rf8vgl8YqIQAh%2BQQABwADACwAAAAAGAAYAAAFrCAgjiQgCGVaDgZZFCQxqKNRKGOSjMjR0qLXTyciHA7AkaLACMIAiwOC1iAxCrMToHHYjWQiA4NBEA0Q1RpWxHg4cMXxNDk4OBxNUkPAQAEXDgllKgMzQA1pSYopBgonCj9JEA8REQ8QjY%2BRQJOVl4ugoYssBJuMpYYjDQSliwasiQOwNakALKqsqbWvIohFm7V6rQAGP6%2BJQLlFg7KDQLKJrLjBKbvAor3IKiEAIfkEAAcABAAsAAAAABgAGAAABbUgII4koChlmhokw5DEoI4NQ4xFMQoJO4uuhignMiQWvxGBIQC%2BAJBEUyUcIRiyE6CR0CllW4HABxBURTUw4nC4FcWo5CDBRpQaCoF7VjgsyCUDYDMNZ0mHdwYEBAaGMwwHDg4HDA2KjI4qkJKUiJ6faJkiA4qAKQkRB3E0i6YpAw8RERAjA4tnBoMApCMQDhFTuySKoSKMJAq6rD4GzASiJYtgi6PUcs9Kew0xh7rNJMqIhYchACH5BAAHAAUALAAAAAAYABgAAAW0ICCOJEAQZZo2JIKQxqCOjWCMDDMqxT2LAgELkBMZCoXfyCBQiFwiRsGpku0EshNgUNAtrYPT0GQVNRBWwSKBMp98P24iISgNDAS4ipGA6JUpA2WAhDR4eWM%2FCAkHBwkIDYcGiTOLjY%2BFmZkNlCN3eUoLDmwlDW%2BAAwcODl5bYl8wCVYMDw5UWzBtnAANEQ8kBIM0oAAGPgcREIQnVloAChEOqARjzgAQEbczg8YkWJq8nSUhACH5BAAHAAYALAAAAAAYABgAAAWtICCOJGAYZZoOpKKQqDoORDMKwkgwtiwSBBYAJ2owGL5RgxBziQQMgkwoMkhNqAEDARPSaiMDFdDIiRSFQowMXE8Z6RdpYHWnEAWGPVkajPmARVZMPUkCBQkJBQINgwaFPoeJi4GVlQ2Qc3VJBQcLV0ptfAMJBwdcIl%2BFYjALQgimoGNWIhAQZA4HXSpLMQ8PIgkOSHxAQhERPw7ASTSFyCMMDqBTJL8tf3y2fCEAIfkEAAcABwAsAAAAABgAGAAABa8gII4k0DRlmg6kYZCoOg5EDBDEaAi2jLO3nEkgkMEIL4BLpBAkVy3hCTAQKGAznM0AFNFGBAbj2cA9jQixcGZAGgECBu%2F9HnTp%2BFGjjezJFAwFBQwKe2Z%2BKoCChHmNjVMqA21nKQwJEJRlbnUFCQlFXlpeCWcGBUACCwlrdw8RKGImBwktdyMQEQciB7oACwcIeA4RVwAODiIGvHQKERAjxyMIB5QlVSTLYLZ0sW8hACH5BAAHAAgALAAAAAAYABgAAAW0ICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi%2BAS2SoyXrK4umWPM5wNiV0UDUIBNkdoepTfMkA7thIECiyRtUAGq8fm2O4jIBgMBA1eAZ6Knx%2BgHaJR4QwdCMKBxEJRggFDGgQEREPjjAMBQUKIwIRDhBDC2QNDDEKoEkDoiMHDigICGkJBS2dDA6TAAnAEAkCdQ8ORQcHTAkLcQQODLPMIgIJaCWxJMIkPIoAt3EhACH5BAAHAAkALAAAAAAYABgAAAWtICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi%2BAS2SoyXrK4umWHM5wNiV0UN3xdLiqr%2BmENcWpM9TIbrsBkEck8oC0DQqBQGGIz%2Bt3eXtob0ZTPgNrIwQJDgtGAgwCWSIMDg4HiiUIDAxFAAoODwxDBWINCEGdSTQkCQcoegADBaQ6MggHjwAFBZUFCm0HB0kJCUy9bAYHCCPGIwqmRq0jySMGmj6yRiEAIfkEAAcACgAsAAAAABgAGAAABbIgII4k0DRlmg6kYZCsOg4EKhLE2BCxDOAxnIiW84l2L4BLZKipBopW8XRLDkeCiAMyMvQAA%2BuON4JEIo%2BvqukkKQ6RhLHplVGN%2BLyKcXA4Dgx5DWwGDXx%2BgIKENnqNdzIDaiMECwcFRgQCCowiCAcHCZIlCgICVgSfCEMMnA0CXaU2YSQFoQAKUQMMqjoyAglcAAyBAAIMRUYLCUkFlybDeAYJryLNk6xGNCTQXY0juHghACH5BAAHAAsALAAAAAAYABgAAAWzICCOJNA0ZVoOAmkY5KCSSgSNBDE2hDyLjohClBMNij8RJHIQvZwEVOpIekRQJyJs5AMoHA%2BGMbE1lnm9EcPhOHRnhpwUl3AsknHDm5RN%2Bv8qCAkHBwkIfw1xBAYNgoSGiIqMgJQifZUjBhAJYj95ewIJCQV7KYpzBAkLLQADCHOtOpY5PgNlAAykAEUsQ1wzCgWdCIdeArczBQVbDJ0NAqyeBb64nQAGArBTt8R8mLuyPyEAOwAAAAAAAAAAAA%3D%3D";

  var request = new XMLHttpRequest();
  request.open("GET", loadPrefix + encodeURIComponent(animation.getAttribute("name")) + loadSuffix);
  request.onload = function() {
    if (!request.responseXML || !request.responseXML.documentElement)
      return;

    animation._data = request.responseXML.documentElement;
    initAnimation(animation);
  }
  request.send(null);
}

function initAnimation(animation) {
  while (animation.firstChild)
    animation.removeChild(animation.firstChild);

  var data = animation._data;
  animation._width = (parseInt(data.getAttribute("width")) || 150);
  animation._height = (parseInt(data.getAttribute("height")) || 150);
  animation._stepSize = parseInt(data.getAttribute("step")) || 20;

  animation.style.width = animation._width + "px";
  animation.style.height = animation._height + "px";

  var count = 0;
  var initializer = function(event) {
    count--;
    if (count <= 0)
      postInitAnimation(animation);
  }

  animation._objects = {};
  var list = data.getElementsByTagNameNS(ns, "object");
  for (var i = 0; i < list.length; i++) {
    var node = list[i];
    if (!node.hasAttribute("id") || !node.hasAttribute("src"))
      continue;

    count++;

    var image = document.createElement("img");
    image.addEventListener("load", initializer, false);
    image.src = node.getAttribute("src");

    var object = document.createElement("div");
    object.style.width = "0px";
    object.style.height = "0px";
    object.style.overflow = "visible";
    object.style.position = "relative";
    object.style.visibility = "hidden";
    object._anchor = node.getAttribute("anchor");
    object._coords = [0,0];

    object.appendChild(image);
    animation.insertBefore(object, animation.firstChild);
    animation._objects[node.getAttribute("id")] = object;
  }
}

function postInitAnimation(animation) {
  for (var key in animation._objects) {
    var object = animation._objects[key];
    var image = object.firstChild;

    object._size = [image.width, image.height];
    var offset = parseCoords(object._anchor);
    if (offset) {
      offset[0] = -offset[0];
      offset[1] = -offset[1];
    }
    else {
      offset = [0, 0];
      if (object._anchor)
        processAnchor(offset, object._anchor, [-image.width, -image.height]);
    }
    object._offset = offset;
  }

  animation._actions = [];

  var getStepData = function(step) {
    if (typeof animation._actions[step] == "undefined")
      animation._actions[step] = [];

    return animation._actions[step];
  }

  var list = animation._data.getElementsByTagNameNS(ns, "action");
  var timestamp = 0;
  for (var i = 0; i < list.length; i++) {
    var node = list[i];
    var prevTimestamp = timestamp;
    timestamp += (parseInt(node.getAttribute("delay")) || 0);

    // Update position for moving objects
    for (var t = prevTimestamp + 1; t < timestamp; t++) {
      if (typeof animation._actions[t] != "undefined") {
        var curActions = animation._actions[t];
        for (var j = 0; j < curActions.length; j++)
          if (typeof curActions[j].obj != "undefined")
            curActions[j].obj._coords = curActions[j].coords;
      }
    }

    for (var child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType != 1)
        continue;

      var objects = child.getAttribute("object");
      if (objects) {
        objects = objects.split(/\s*,\s*/);
        for (var j = 0; j < objects.length; j++) {
          if (typeof animation._objects[objects[j]] == "undefined")
            objects.splice(j--, 1);
          else
            objects[j] = animation._objects[objects[j]];
        }
      }
      if (objects.length == 0)
        continue;

      if (child.localName == "show") {
        var coords = parseRelativeCoords(animation._objects, child, "coords", "coordsOf", "anchor", "offset");
        if (coords) {
          var data = getStepData(timestamp);
          for (var j = 0; j < objects.length; j++) {
            objects[j]._coords = coords;
            data.push({obj: objects[j], coords: coords});
          }
        }
      }
      else if (child.localName == "hide" || child.localName == "replace") {
        var data = getStepData(timestamp);
        data.push.apply(getStepData(timestamp), objects);
        if (child.localName == "replace" && typeof animation._objects[child.getAttribute("with")] != "undefined") {
          var object = animation._objects[child.getAttribute("with")];
          object._coords = objects[0]._coords;
          data.push({obj: object, coords: object._coords});
        }
      }
      else if (child.localName == "move") {
        var from = parseRelativeCoords(animation._objects, child, "fromCoords", "fromCoordsOf", "fromAnchor", "fromOffset");
        var to = parseRelativeCoords(animation._objects, child, "toCoords", "toCoordsOf", "toAnchor", "toOffset");
        var duration = parseInt(child.getAttribute("duration")) || 0;
        if (to) {
          if (!from)
            from = objects[0]._coords;

          for (var j = 0; j < objects.length; j++)
            objects[j]._coords = from;

          for (var t = timestamp; t <= timestamp + duration; t++) {
            var curCoords = [
                              (timestamp + duration - t) / duration * from[0] + (t - timestamp) / duration * to[0],
                              (timestamp + duration - t) / duration * from[1] + (t - timestamp) / duration * to[1]
                            ];
            var data = getStepData(t);
            for (var j = 0; j < objects.length; j++)
              data.push({obj: objects[j], coords: curCoords});
          }
        }
      }
    }
  }

  runAnimation(animation);
}

function executeAnimationStep(animation, timestamp) {
  if (typeof animation._actions[timestamp] == "undefined")
    return;

  var action = animation._actions[timestamp];
  for (var i = 0; i < action.length; i++) {
    if (action[i] instanceof HTMLElement)
      action[i].style.visibility = "hidden";
    else {
      action[i].obj.style.left = (action[i].coords[0] + action[i].obj._offset[0]) + "px";
      action[i].obj.style.top = (action[i].coords[1] + action[i].obj._offset[1]) + "px";
      action[i].obj.style.visibility = "";
    }
  }
}

function runAnimation(animation) {
  if (typeof animation.scrollIntoView == "function")
    animation.scrollIntoView(true)

  executeAnimationStep(animation, 0);

  var curStep = 0;
  var interval = setInterval(function() {
    executeAnimationStep(animation, ++curStep);
    if (curStep >= animation._actions.length) {
      clearInterval(interval);
      animation.style.cursor = "pointer";
      animation.addEventListener("click", restartAnimation, false);
    }
  }, animation._stepSize);
}

function restartAnimation(event) {
  var animation = event.target;
  while (animation && animation.nodeType == 1 && animation.className != "animation")
    animation = animation.parentNode;

  if (!animation || animation.nodeType != 1)
    return;

  animation.removeEventListener("click", restartAnimation, false);
  animation.style.cursor = "";

  for (var key in animation._objects)
    animation._objects[key].style.visibility = "hidden";

  runAnimation(animation);
}

function parseCoords(coords) {
  if (!/^\s*([\-+]?\d+)\s*,\s*([\-+]?\d+)\s*$/.test(coords))
    return null;

  return [parseInt(RegExp.$1) || 0, parseInt(RegExp.$2) || 0];
}

function parseRelativeCoords(objects, node, coordsAttr, objectAttr, anchorAttr, offsetAttr) {
  var coords = parseCoords(node.getAttribute(coordsAttr));
  if (!coords) {
    var object = node.getAttribute(objectAttr);
    if (object && typeof objects[object] != "undefined") {
      object = objects[object];
      coords = object._coords.slice(0);

      var anchor = node.getAttribute(anchorAttr);
      if (anchor) {
        coords[0] += object._offset[0];
        coords[1] += object._offset[1];
        processAnchor(coords, anchor, object._size);
      }
    }
  }

  if (coords) {
    var offset = parseCoords(node.getAttribute(offsetAttr));
    if (offset) {
      coords[0] += offset[0];
      coords[1] += offset[1];
    }
  }

  return coords;
}

function processAnchor(coords, anchor, size) {
  if (/right/i.test(anchor))
    coords[0] += size[0];
  else if (!/left/i.test(anchor))
    coords[0] += Math.round(size[0]/2);

  if (/bottom/i.test(anchor))
    coords[1] += size[1];
  else if (!/top/i.test(anchor))
    coords[1] += Math.round(size[1]/2);
}
