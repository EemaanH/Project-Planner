const addObjectButton = document.getElementById("addObject");
const display = document.getElementById("display");

let objectCount = 0;

addObjectButton.addEventListener("click", function()
{
  const displayWidth = Number(
    document.getElementByID("displayWidth").value
    );

  const displayHeight = Number(
    document.getElementById("displayHeight").value
    );

  const objectName = prompt("What is the name of this object?";

  const objectWidth = Number(
    prompt("Enter object width in inches:")
  );

   const objectHeight = Number(
     prompt("Enter object height in inches:")
   );

  if (
    !objectName ||
    objectWidth <= 0 ||
    objectHeight <= 0 ||
    displayWidth <= 0 ||
    displayHeight <= 0
    )
  {
    alert("Please enter valid dimensions.");
    return;
  }

  const scale = Math.min(
    25,
    600 / displayWidth,
    450 / displayHeight
    );
  
  const object = document.createElement("div");
object.classList.add("object");

  object.style.width = `${objectWidth * scale}px`;
  object.style.height = `${objectHeight * scale}px`;
  
object.style.left = `${20 + objectCount * 30}px`;
object.style.Top = `${20 + objectCount * 30}px`;

object.textContent = objectName;

object.style.display = "flex";
object.style.alignItems = "canter";
object.style.justifyContent = "center";
object.style.textAlign = "center";

display.appendChild(object);

objectCount++;
});
