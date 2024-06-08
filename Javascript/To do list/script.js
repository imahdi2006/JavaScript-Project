const todoList = document.querySelector(".todo-container");
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const filterOption = document.querySelector(".filter-todos");


todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener('click', filtertodos);
document.addEventListener('DOMContentLoaded',getLocalTodos);


function addTodo(e) {
    e.preventDefault();
    console.log(e);

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = `
        <li>${todoInput.value}</li>
        <span><i class="far fa-check-square"></i></span>
        <span><i class="far fa-trash-alt"></i></span>
    `;
    todoDiv.innerHTML = newTodo;

    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
}


function checkRemove(e) {
    const classList = [...e.target.classList];
    const item = e.target;
    console.log(item.parentElement.parentElement);
    if (classList[1] === "fa-check-square") {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");
    } else if (classList[1] === "fa-trash-alt") {
        const todo = item.parentElement.parentElement;
        removeLocalTods(todo);
        todo.remove();
    } 
}

function filtertodos(e) {
    console.log(todoList.childNodes);
    const todos = [...todoList.childNodes];
    todos.forEach(todo => {
        switch(e.target.value) {
            case "all":
            todo.style.display = "flex";
            break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                    break;
                case "uncompleted":
                    if(!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                        break;
        }
    });
}


function saveLocalTodos(todo){
    let saveTodos = localStorage.getItem("todos") ?
    JSON.parse(localStorage.getItem("todos"))
    : [] ;
    saveTodos.push(todo);
    localStorage.setItem("todos",JSON.stringify(saveTodos));
}

function getLocalTodos() {
    let saveTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) :
        [];

    saveTodos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = `
            <li>${todo}</li>
            <span><i class="far fa-check-square"></i></span>
            <span><i class="far fa-trash-alt"></i></span>
        `;
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    });
}


function removeLocalTods(todo) {
    let saveTodos = localStorage.getItem("todos") ?
    JSON.parse(localStorage.getItem("todos"))
    : [] ;
    const filtertodos = saveTodos.filter((t) => t !== todo.children[0].innerText
    );
    localStorage.setItem("todos", JSON.stringify(filtertodos));
}

 