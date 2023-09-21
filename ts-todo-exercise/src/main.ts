type Todo = {
   id: string
   title: string
   completed: boolean
   createdAt: Date
}

const form = document.querySelector<HTMLFormElement>("#new-todo-form")
const input = document.querySelector<HTMLInputElement>("#new-todo-input")
const todoList = document.querySelector<HTMLUListElement>("#todo-list")
const clearCompletedButton = document.querySelector<HTMLButtonElement>(
   "#clear-completed-button"
)

let todos: Todo[] = loadTodos()
todos.forEach(addListItem)

form?.addEventListener("submit", (e) => {
   e.preventDefault()
   if (!input || input.value === "") return

   const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: input.value,
      completed: false,
      createdAt: new Date(),
   }

   todos.push(newTodo)
   saveTodos()
   addListItem(newTodo)
   input.value = ""
})

clearCompletedButton?.addEventListener("click", () => {
   clearCompletedTodos()
   saveTodos()
   removeListItems()
})

function addListItem(todo: Todo) {
   const li = document.createElement("li")
   const label = document.createElement("label")
   const checkbox = document.createElement("input")
   const deleteButton = document.createElement("button")
   checkbox.type = "checkbox"
   checkbox.checked = todo.completed
   deleteButton.type = "button"
   deleteButton.innerText = "Delete"

   deleteButton.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id)
      saveTodos()
      li.remove()
   })

   checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked
      saveTodos()
   })

   label.append(checkbox, todo.title)
   li.append(label, deleteButton)
   todoList?.append(li)
}

function saveTodos() {
   localStorage.setItem("TODOS", JSON.stringify(todos))
}

function loadTodos(): Todo[] {
   const localStorageTodos = localStorage.getItem("TODOS")
   if (!localStorageTodos) return []
   return JSON.parse(localStorageTodos)
}

function clearCompletedTodos() {
   todos = todos.filter((todo) => !todo.completed)
}

function removeListItems() {
   if (!todoList) return

   Array.from(todoList.children).forEach((item) => {
      const checkbox = item.querySelector<HTMLInputElement>(
         "input[type='checkbox']"
      )
      if (checkbox?.checked) item.remove()
   })
}
