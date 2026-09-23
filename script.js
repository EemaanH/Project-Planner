const addObjectButton = document.getElementById("addObject");
const display = document.getElementById("display");

addObjectButton.addEventListener("click", function()
{
const object = document.createElement("div");
  object.classList.add("object");
  display.appendChild(object);

});
  
