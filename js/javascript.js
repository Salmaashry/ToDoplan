const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}


todoValue.addEventListener("keypress",function(e){
    
    setAlertMessage("")
    if(e.key === "Enter"){
        addUpdate.click();
    }
})



function CreateToDoItems() {
    if (todoValue.value === "") {
      setAlertMessage("Please enter your todo text!") ;
      todoValue.focus();
    } else {
      let IsPresent = false;
      todo.forEach((element) => {
        if (element.item == todoValue.value) {
          IsPresent = true;
        }
      });
  
      if (IsPresent) {
        setAlertMessage("This item already present in the list!");
        return;
      }
  
      let li = document.createElement("li");
      const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                      <i class="fa-solid fa-pencil pe-2" class="edit todo-controls" onclick="UpdateToDoItems(this)"></i>
                     <i class="fa-solid fa-trash" class="delete todo-controls pe-2" onclick="DeleteToDoItems(this)"></i>

                   </div></div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);
  
      if (!todo) {
        todo = [];
      }
      let itemList = { item: todoValue.value, status: false };
      todo.push(itemList);
      setLocalStorage();
       setAlertMessage("Todo item Created Successfully!"); 
    }
  todoValue.value = "";
     
   
  }



  function ReadToDoItems() {
    todo.forEach((element) => {
      let li = document.createElement("li");
      let style = "";
      if (element.status) {
        style = "style='text-decoration: line-through'";
      }
      const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
        element.item
      }
      ${
        style === ""
          ? ""
          : '<i class="todo-controls fa-solid fa-spinner"></i>'
      }</div><div>
      ${
        style === ""

          ? ' <i class="fa-solid fa-pencil pe-2" class="edit todo-controls" onclick="UpdateToDoItems(this)"></i>'

          : ""
      }
 <i class="fa-solid fa-trash" class="delete todo-controls pe-2" onclick="DeleteToDoItems(this)"></i>
</div></div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);
    });
  }
  ReadToDoItems();




  function UpdateToDoItems(e) {
    if (
      e.parentElement.parentElement.querySelector("div").style.textDecoration ===
      ""
    ) {
      todoValue.value =
        e.parentElement.parentElement.querySelector("div").innerText;
      updateText = e.parentElement.parentElement.querySelector("div");
      addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
      addUpdate.setAttribute("src", "/images/refresh.png");
      todoValue.focus();
    }
  }
  
  function UpdateOnSelectionItems() {
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == todoValue.value) {
        IsPresent = true;
      }
    });
  
    if (IsPresent) {
      setAlertMessage("This item already present in the list!");
      return;
    }
  
    todo.forEach((element) => {
      if (element.item == updateText.innerText.trim()) {
        element.item = todoValue.value;
      }
    });
    setLocalStorage();
  
    updateText.innerText = todoValue.value;
    addUpdate.setAttribute("onclick", "CreateToDoItems()");
    addUpdate.setAttribute("class", "fa-solid fa-plus");
    todoValue.value = "";
    setAlertMessage("Todo item Updated Successfully!");

  } 


  function DeleteToDoItems(e) {
    let deleteValue =
      e.parentElement.parentElement.querySelector("div").innerText;
  
    if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
      e.parentElement.parentElement.setAttribute("class", "deleted-item");
      todoValue.focus();
  
      todo.forEach((element) => {
        if (element.item == deleteValue.trim()) {
          todo.splice(element, 1);
        }
      });
  
      setTimeout(() => {
        e.parentElement.parentElement.remove();
      }, 1000);
      setAlertMessage("Deleted Task Successfully!");
    
      setLocalStorage();
    }
  }



  function CompletedToDoItems(e) {
    if (e.parentElement.querySelector("div").style.textDecoration === "") {
      const i = document.createElement("i");
      i = "fa-solid fa-spinner";
      
      i.className = "todo-controls";
      e.parentElement.querySelector("div").style.textDecoration = "line-through";
      e.parentElement.querySelector("div").appendChild(li);
      e.parentElement.querySelector("i.edit").remove();
  
      todo.forEach((element) => {
        if (
          e.parentElement.querySelector("div").innerText.trim() == element.item
        ) {
          element.status = true;
        }
      });
     
      setAlertMessage("Todo item Completed Successfully!");
      setLocalStorage();
    }
  }


  function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
  }



  function setAlertMessage(message) {
    todoAlert.removeAttribute("class");
    todoAlert.innerText = message;
    setTimeout(() => {
      todoAlert.classList.add("toggleMe");
    }, 1000);
  }
