export const query = new URLSearchParams(location.search);

export const parent = document.createElement("div");
parent.className = "test";

/** log to console and optionally status textarea */
export function log(context, message) {
  console.log(context, message);
  if (dom[context]) {
    dom[context].value += message + "\n";
  }
}

/** reference to all tags created by create() by name */
export const dom = { parent };

/** dom creation and reference helper function */
export function create(tree) {
  const elements = [];
  for (const [name, tag, attributes, children] of tree) {
    const element = dom[name] = document.createElement(tag);
    if (typeof attributes == "object") {
      for (const prop in attributes) {
        element[prop] = attributes[prop];
      }
    }
    element.classList.add(name);
    if (Array.isArray(children)) {
      for (const child of children) {
        for (const childElement of create([child])) {
          element.append(childElement);
        }
      }
    }
    elements.push(element);
  }
  return elements;
}

/** parent element append helper  */
export function append(tree) {
  for (const branch of tree) parent.append(branch);
}