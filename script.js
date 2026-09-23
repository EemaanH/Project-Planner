const addObjectButton = document.getElementById("addObject");
const display = document.getElementById("display");

addObjectButton.addEventListener("click", function()
{
const width = Number(prompt("Enter object width in inches:"));
const height - Number(prompt("Enter object height in inches"));

  const object = document.createElement("div");

  const scale = 25;

  object.style.width = `${width * scale}px`;
  object.style.height = `${height * scale}px`;

  display.appendChild(object);
  
});
  
