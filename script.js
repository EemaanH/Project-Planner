const addObjectButton = document.getElementById("addObject");
const createObjectButton = document.getElementById("createObject");
const objectPanel = document.getElementById("objectPanel");
const display = document.getElementById("display");
const editObjectButton = document.getElementById("editObject");
const updateObjectButton = document.getElementById("updateObject");
const infoName = document.getElementById("infoName");
const infoWidth = document.getElementById("infoWidth");
const infoHeight = document.getElementById("infoHeight");
const infoX = document.getElementById("infoX");
const infoY = document.getElementById("infoY");
const fitStatus = document.getElementById("fitStatus");
const overlapStatus = document.getElementById("overlapStatus");

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
         600 / displayWidth,
         600 / displayHeight
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

      selectedObject.dataset.x = selectedObject.offsetLeft / scale;
      selectedObject.dataset.y = selectedObject.offsetTop / scale; 

      checkObjectFit();
      checkObjectOverlap();
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
    600 / displayWidth,
    600 / displayHeight
    );
  
const object = document.createElement("div");
object.classList.add("object");

object.dataset.name = objectName;
object.dataset.width = objectWidth;
object.dataset.height = objectHeight;
   
const initialLeft = 20 + objectCount * 30;
const initialTop = 20 + objectCount * 30;

object.dataset.x = initialLeft / scale;
object.dataset.y = initialTop / scale;

object.style.width = `${objectWidth * scale}px`;
object.style.height = `${objectHeight * scale}px`;

object.style.left = `${initialLeft}px`;
object.style.top = `${initialTop}px`;

object.textContent = objectName;

object.style.display = "flex";
object.style.alignItems = "center";
object.style.justifyContent = "center";
object.style.textAlign = "center";

display.appendChild(object);

makeDraggable(object);

if(selectedObject)
{
   selectedObject.classList.remove("selected");
}
   selectedObject = object;
   selectedObject.classList.add("selected");

   infoName.textContent = object.dataset.name;
   infoWidth.textContent = object.dataset.width + " inches";
   infoHeight.textContent = object.dataset.height + " inches";
   infoX.textContent = (object.offsetLeft / scale).toFixed(1) + " inches";
   infoY.textContent = (object.offsetTop / scale).toFixed(1) + " inches";

   checkObjectFit();
   checkObjectOverlap();

objectCount++;
  
// Clear the form
document.getElementById("objectName").value = "";

document.getElementById("objectWidth").value = "";

document.getElementById("objectHeight").value = "";
});

//Make Objects Draggable 
function makeDraggable(object)
{
  console.log("makeDraggable is running:", object.dataset.name);
   
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let scale = 1;

  object.addEventListener("click", function()
  {
   console.log("CLICKED:", object.dataset.name);
     
   if (selectedObject)
   { 
      selectedObject.classList.remove("selected");
   }

   selectedObject = object;
   selectedObject.classList.add("selected");

   objectPanel.style.display = "block";

   infoName.textContent = selectedObject.dataset.name;
   infoWidth.textContent = selectedObject.dataset.width + " inches";
   infoHeight.textContent = selectedObject.dataset.height + " inches";

   const displayWidth = Number(
      document.getElementById("displayWidth").value
      );

   const displayHeight = Number(
      document.getElementById("displayHeight").value
      );

   const scale = Math.min(
      600 / displayWidth,
      600 / displayHeight
      );

   infoX.textContent = 
      (object.offsetLeft / scale).toFixed(1) + " inches";

   infoY.textContent = 
      (object.offsetTop / scale).toFixed(1) + " inches";

   checkObjectFit();
   checkObjectOverlap();
});

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
         
         const displayWidth = Number(
         document.getElementById("displayWidth").value);

         const displayHeight = Number(
         document.getElementById("displayHeight").value);

         scale = Math.min(
            600 / displayWidth,
            600 / displayHeight
            );

         infoX.textContent = (object.offsetLeft / scale).toFixed(1) + " inches";
         infoY.textContent = (object.offsetTop / scale).toFixed(1) + " inches";

         checkObjectFit();
         checkObjectOverlap();

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

          infoX.textContent = (newLeft / scale).toFixed(1) + " inches";
          infoY.textContent = (newTop / scale).toFixed(1) + " inches";

         object.dataset.x = newLeft / scale;
         object.dataset.y = newTop / scale;

         checkObjectOverlap();
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
               infoX.textContent = "-";
               infoY.textContent = "-";
               
               fitStatus.textContent = "";
               overlapStatus.textContent = "";
            }
         });

function updateDisplaySize()
   {
      const displayWidth = Number(
         document.getElementById("displayWidth").value
         );

      const displayHeight = Number(
         document.getElementById("displayHeight").value
         );

      if (displayWidth <= 0 || displayHeight <= 0)
      {
         return;
      }

      const maxDisplaySize = 600;

      const displayScale = Math.min(
         maxDisplaySize / displayWidth,
         maxDisplaySize / displayHeight
      );

      display.style.width = `${displayWidth * displayScale}px`;
      display.style.height = `${displayHeight * displayScale}px`;

      display.querySelectorAll(".object").forEach(function(object)
      {
         const objectWidth = Number(object.dataset.width);
         const objectHeight = Number(object.dataset.height);

         object.style.width = `${objectWidth * displayScale}px`;
         object.style.height = `${objectHeight * displayScale}px`;

         let newLeft = Number(object.dataset.x) * displayScale;
         let newTop = Number(object.dataset.y) * displayScale;

         const maxLeft = display.clientWidth - object.offsetWidth;
         const maxTop = display.clientHeight - object.offsetHeight;

         newLeft = Math.max(0, Math.min(newLeft, maxLeft));
         newTop = Math.max(0, Math.min(newTop, maxTop));

         object.style.left = `${newLeft}px`;
         object.style.top = `${newTop}px`;

         object.dataset.x = newLeft / displayScale;
         object.dataset.y = newTop / displayScale;

         if (object === selectedObject)
         {
            infoX.textContent = (newLeft / displayScale).toFixed(1) + " inches";
            infoY.textContent = (newTop / displayScale).toFixed(1) + " inches";
         }
      });

      checkObjectFit();
      checkObjectOverlap();
   }
      document.getElementById("displayWidth").addEventListener(
         "input",
         function()
         {
            updateDisplaySize();
         }
         
      );
   document.getElementById("displayHeight").addEventListener(
      "input",
      function()
      {
         updateDisplaySize();
      }
      );

      function checkObjectFit()
      {
         if(!selectedObject)
         {
            fitStatus.textContent = "";
            return;
         }

         const displayWidth = Number(
            document.getElementById("displayWidth").value
         );

         const displayHeight = Number(
            document.getElementById("displayHeight").value
         );

         const objectX = selectedObject.offsetLeft;
         const objectY = selectedObject.offsetTop;

         const scale = Math.min(
            600 / displayWidth,
            600 / displayHeight
         );

         const objectRight = (objectX + selectedObject.offsetWidth) / scale;
         
         const objectBottom = (objectY + selectedObject.offsetHeight) / scale;

         if (
            objectX >= 0 &&
            objectY >= 0 &&
            objectRight <= displayWidth &&
            objectBottom <= displayHeight
            )
         {
            fitStatus.textContent = "Fits inside display";
            fitStatus.className = "fits";
         }
         else
         {
            fitStatus.textContent = "Does not fit inside display";
            fitStatus.className = "does-not-fit";
         }
      }
function checkObjectOverlap()
{
   if(!selectedObject)
   {
      overlapStatus.textContent = "";
      return false;
   }

   const selectedLeft = selectedObject.offsetLeft;
   const selectedTop = selectedObject.offsetTop;
   const selectedRight = selectedLeft + selectedObject.offsetWidth;
   const selectedBottom = selectedTop + selectedObject.offsetHeight;

   const objects = display.querySelectorAll(".object");

   for(const object of objects)
      {
         if (object === selectedObject)
         {
            continue;
         }

         const objectLeft = object.offsetLeft;
         const objectTop = object.offsetTop;
         const objectRight = objectLeft + object.offsetWidth;
         const objectBottom = objectTop + object.offsetHeight;

         if(
            selectedLeft < objectRight &&
            selectedRight > objectLeft &&
            selectedTop < objectBottom &&
            selectedBottom > objectTop
            )
         {
            overlapStatus.textContent = "Objects are overlapping";
            overlapStatus.className = "overlapping";
            
            return true;
         }
      }
      overlapStatus.textContent = "Objects are not overlapping";
      overlapStatus.className = "not-overlapping";

      return false;
   }
   

