const addObjectButton = document.getElementById("addObject");
const createObjectButton = document.getElementById("createObject");
const objectPanel = document.getElementById("objectPanel");
const display = document.getElementById("display");

let objectCount = 0;
let selectedObject = null;

//Show the Add Object Panel
addObjectButton.addEventListener("click", function()
{
   objectPanel.style.display = "block";
});

// Create the object
createObjectButton.addEventListener("click", function()
{
  const displayWidth = Number(
    document.getElementById("displayWidth").value
  );

  const displayHeight = Number(
    document.getElementById("displayHeight").value
  );

  const objectName =
    document.getElementById("objectName").value;

  const objectWidth = Number(
    document.getElementById("objectWidth").value
  );

  const objectHeight = Number(
    document.getElementById("objectHeight").value
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
object.style.top = `${20 + objectCount * 30}px`;

object.textContent = objectName;

object.style.display = "flex";
object.style.alignItems = "center";
object.style.justifyContent = "center";
object.style.textAlign = "center";

display.appendChild(object);

makeDraggable(object);

objectCount++;
  
// Clear the form
document.getElementById("objectName").value = "";

document.getElementById("objectWidth").value = "";

document.getElementById("objectHeight").value = "";
});

//Make Objects Draggable 
function makeDraggable(object)
{
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  object.addEventListener("mousedown", function(event)
      {
        if (selectedObject)
        {
           selectedObject.classList.remove("selected");
        }

         selectedObject = object;
         selectedObject.classList.add("selected");

         isDragging = true;

         offsetX = event.clientX - object.offsetLeft;
         offsetY = event.clientY - object.offsetTop;
      });

document.addEventListener("mousemove", function(event)
        {
          if (!isDragging)
          {
            return;
          }
            let newLeft = event.clientX - offsetX;
            let newTop = event.clientY - offsetY;

          const maxLeft = display.clientWidth - object.offsetWidth;
          const maxTop = display.clientHeight - object.offsetHeight;

          newLeft = Math.max(0, Math.min(newLeft, maxLeft));
          newTop = Math.max(0, Math.min(newTop, maxTop));

          object.style.left = `${newLeft}px`;
          object.style.top = `${newTop}px`;
          });

document.addEventListener("mouseup", function()
          {
            isDragging = false;
          });
}

document.addEventListener("keydown", function(event)
         {
            if (event.key === "Backspace" && selectedObject)
            {
               event.preventDefault();
               
               selectedObject.remove();
               selectedObject = null;
            }
         });


