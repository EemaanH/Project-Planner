const addObjectButton = document.getElementById("addObject");
const createObjectButton = document.getElementById("createObject");
const objectPanel = document.getElementById("objectPanel");
const display = document.getElementById("display");
const editObjectButton = document.getElementById("editObject");
const updateObjectButton = document.getElementById("updateObject");
const infoName = document.getElementById("infoName");
const infoWidth = document.getElementById("infoWidth");
const infoHeight = document.getElementById("infoHeight");

let objectCount = 0;
let selectedObject = null;

//Show the Add Object Panel
addObjectButton.addEventListener("click", function()
{
   objectPanel.style.display = "block";
});

//Edits the object
editObjectButton.addEventListener("click", function()
{
   if (!selectedObject)
   {
      return;
   }
   document.getElementById("objectName").value = selectedObject.dataset.name;

   document.getElementById("objectWidth").value = selectedObject.dataset.width;

   document.getElementById("objectHeight").value = selectedObject.dataset.height;
});

//Updates the selected object
updateObjectButton.addEventListener("click", function()
   {
      if (!selectedObject)
      {
         return;
      }

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
         objectHeight <= 0
         )
      {
         alert("Please enter valid dimensions.");
         return;
      }

      const displayWidth = Number(
         document.getElementById("displayWidth").value
         );

      const displayHeight = Number(
         document.getElementById("displayHeight").value
         );

      const scale = Math.min(
         25,
         600 / displayWidth,
         450 / displayHeight
         );

      selectedObject.dataset.name = objectName;
      selectedObject.dataset.width = objectWidth;
      selectedObject.dataset.height = objectHeight;

      infoName.textContent = objectName;
      infoWidth.textContent = objectWidth + " inches";
      infoHeight.textContent = objectHeight + " inches";

      selectedObject.textContent = objectName;

      selectedObject.style.width = 
         `${objectWidth * scale}px`;

      selectedObject.style.height = 
         `${objectHeight * scale}px`;
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

object.dataset.name = objectName;
object.dataset.width = objectWidth;
object.dataset.height = objectHeight;

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

         infoName.textContent = selectedObject.dataset.name;
         infoWidth.textContent = selectedObject.dataset.width + " inches";
         infoHeight.textContent = selectedObject.dataset.height + " inches";

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
            if (event.key === "Backspace" && selectedObject && event.target.tagName !== "INPUT")
            {
               event.preventDefault();
               
               selectedObject.remove();
               selectedObject = null;

               infoName.textContent = "None";
               infoWidth.textContent = "-";
               infoHeight.textContent = "-";
            }
         });


