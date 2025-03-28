let todos = [
    {id: 1, text: "Learn JavaScript"},
    {id: 2, text: "Build a to-do app"},
    {id: 3, text: "Master DOM manipulation"}
];
let todoList = document.getElementById("todo-list")
let todoInput = document.getElementById("todo-input")
let addButton = document.getElementById("add-button")


// TODO: Select and store references to the necessary DOM elements: check
// - todoList: the <ul> element to contain the todo items: Check
// - todoInput: the input field for new todos: check
// - addButton: the button to add new todos: check

// Create todo item element
function createToDoElement(todo){
  const listitem = document.createElement("li")
  listitem.id = "todo-item-${todo.id}";
  listitem.classlist.add("todo-item")
  const textspan = document.createElement("span")
  textspan.textContent = todo.text;
  const deletebutton = document.createElement("button");
  deletebutton.textContent = "delete";
  deletebutton.classList.add("delete-button");
  deletebutton.addEventListener("click", function(event){
                                    deleteTodo(todo.id);
                                });
  listitem.appendChild(textspan);
  listitem.appendChild(deletebutton);
  return listitem;
  
}  

    // TODO: Implement this function
    // 1. Create a new <li> element
    // 2. Add the 'todo-item' class to the <li>
    // 3. Create a <span> for the todo text
    // 4. Set the span's text content to todo.text
    // 5. Create a delete button
    // 6. Add a click event listener to the delete button that calls deleteTodo(todo.id)
    // 7. Append the span and delete button to the <li>
    // 8. Return the <li> element

// Render todos
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(todo => { ... })
        const li = document.createElement("li");
        li.textContent = todo;
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            todos.splice(index, 1);
            renderTodos();
        });
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    };
    // TODO: Implement this function
    // 1. Clear the existing list
    // 2. Loop through the todos array
    // 3. For each todo, call createTodoElement(todo) and append the result to the todo list
}

// Add todo
function addTodo() {
    todoForm.addEventListener("submit", function(event){
        event.preventDefault();
        const newTodo = todoInput.value.trim();
        if (newTodo) {
            todos.push(newTodo);
            todoInput.value = "";
            renderTodos();
        }
    });
    // TODO: Implement this function
    // 1. Get the text from the input field
    // 2. If the text is not empty:
    //    a. Create a new todo object with a unique id and the input text
    //    b. Add the new todo object to the todos array
    //    c. Clear the input field
    //    d. Call renderTodos() to update the display
}

// Delete todo
function deleteTodo(id) {
    // TODO: Implement this function
    // 1. Remove the todo with the given id from the todos array
    // 2. Call renderTodos() to update the display
}

// TODO: Add a click event listener to the add button that calls addTodo

// TODO: Add a keypress event listener to the input field 
// that calls addTodo when the Enter key is pressed

// Initial render
renderTodos();
