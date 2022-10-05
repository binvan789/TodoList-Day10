var input = document.querySelector('input')
var button = document.querySelector('button')
var form = document.querySelector('form')
var todos = document.querySelector('.todos')
form.addEventListener('submit',e=>{
    e.preventDefault()
    let value = input.value.trim()
    if (value) {
        addTodoElement({
            text: value,
        })
    }
    input.value = ''
    saveTodoList()
})

function addTodoElement(todo) {
    // {
        // Text: 
        // Status:
    // }

    // <li>
    //     <span>Test</span>
    //     <i class="fa-regular fa-trash-can"></i>
    // </li>   

    var li = document.createElement('li')
    li.innerHTML = `
            <span>${todo.text}</span>
            <i class="fa-regular fa-trash-can"></i>
    `
    if (todo.status == 'completed') {
        li.setAttribute('class','completed')
        saveTodoList()
    }

    li.addEventListener('click',function(){
        this.classList.toggle('completed')
        saveTodoList()
    })

    li.querySelector('i').addEventListener('click',function() {
        this.parentElement.remove()
        saveTodoList()
    })

    todos.appendChild(li)
}

function saveTodoList() {
    let todoList = document.querySelectorAll('li')
    let todoStorage = []
    todoList.forEach(item => {
        let text = item.querySelector('span').innerText
        let status = item.getAttribute('class')
        todoStorage.push({
            text,
            status
        })
        localStorage.setItem('todoList', JSON.stringify(todoStorage))
    })
}


function initTodoList() {
    let data = JSON.parse(localStorage.getItem('todoList'))
    data.forEach(item => {
        addTodoElement(item);
    })
}

initTodoList()
