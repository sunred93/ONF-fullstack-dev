// Variables
let todos = [];
let todoList = document.getElementById("todo-list");
let todoInput = document.getElementById("todo-input");
let addButton = document.getElementById("add-button");
let completedList = document.getElementById("completed-list");

// Initial setup (load data and render)
loadTodosFromLocalStorage();
renderTodos();

// Helper functions
function createDeleteButton(todoId) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodo(todoId);
    });
    return deleteButton;
}

function createToDoElement(todo) {
    const listItem = document.createElement("li");
    listItem.id = `todo-item-${todo.id}`;
    listItem.classList.add("todo-item");

    const todoTextSpan = document.createElement("span");
    todoTextSpan.textContent = todo.text;

    const deleteButton = createDeleteButton(todo.id);

    // Create the complete button
    const completeButton = document.createElement("button");
    completeButton.textContent = todo.completed ? "Undo" : "Done"; // Set text based on completed state
    completeButton.classList.add("complete-button");
    completeButton.addEventListener("click", () => {
        toggleComplete(todo.id);
    });

    listItem.appendChild(todoTextSpan);
    listItem.appendChild(deleteButton);
    listItem.appendChild(completeButton); // Append the complete button

    return listItem;
}

// Local Storage functions
function loadInitialTodos() {
    const initialTodos = [
        { id: 1, text: "Learn JavaScript", completed: false }, 
        { id: 2, text: "Build a to-do app", completed: false }, 
        { id: 3, text: "Master DOM manipulation", completed: false } 
    ];
    localStorage.setItem("todos", JSON.stringify(initialTodos));
}

function loadTodosFromLocalStorage() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    } else {
        loadInitialTodos();
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function saveTodosToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Render function
function renderTodos() {
    // Clear the existing lists
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
    while (completedList.firstChild) {
        completedList.removeChild(completedList.firstChild);
    }

    const todoFragment = document.createDocumentFragment();
    const completedFragment = document.createDocumentFragment();

    todos.forEach(todo => {
        const listItem = createToDoElement(todo);
        if (todo.completed) {
            completedFragment.appendChild(listItem);
        } else {
            todoFragment.appendChild(listItem);
        }
    });
    todoList.appendChild(todoFragment);
    completedList.appendChild(completedFragment);
}

// Toggle complete
function toggleComplete(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed; // Toggle the completed state
        saveTodosToLocalStorage();
        renderTodos();
    }
}

// CRUD functions (create,read,update and delete)
function addTodo() {
    const newTodo = todoInput.value.trim();
    if (newTodo) {
        const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
        todos.push({ id: newId, text: newTodo, completed: false }); // Add completed property
        todoInput.value = "";
        saveTodosToLocalStorage();
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodosToLocalStorage();
    renderTodos();
}

// Event listeners
addButton.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTodo();
    }
});
