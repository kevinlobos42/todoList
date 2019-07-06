const addItemBtn = document.getElementById("add-btn");
const item = document.getElementById("item-text");
const itemList = document.getElementById("item-list");
let check;

function addItem() {
  console.log(item.value);
  const node = document.createElement("div");

  const h1 = document.createElement("h1");
  const val = document.createTextNode(item.value);
  h1.appendChild(val);

  const status = document.createElement("div");
  status.classList.add("status");
  check = document.createElement("i");
  check.classList.add("far");
  check.classList.add("fa-check-circle");
  let checkDesc = document.createElement("p");
  checkDesc.classList.add("desc");
  checkDesc.appendChild(document.createTextNode("Check off"));
  check.appendChild(checkDesc);

  var remove = document.createElement("i");
  remove.classList.add("far");
  remove.classList.add("fa-times-circle");
  let removeDesc = document.createElement("p");
  removeDesc.classList.add("desc");
  removeDesc.appendChild(document.createTextNode("Remove"));
  remove.appendChild(removeDesc);

  status.appendChild(check);
  status.appendChild(remove);

  node.appendChild(h1);
  node.appendChild(status);
  itemList.appendChild(node);
}
window.addEventListener("click", removeItem);
function removeItem(e) {
  if (e.target.className == "far fa-times-circle") {
    e.target.parentNode.parentNode.style.display = "none";
  }
}
