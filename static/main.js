// https://docs.djangoproject.com/en/3.2/ref/csrf/#acquiring-the-token-if-csrf-use-sessions-and-csrf-cookie-httponly-are-false
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

async function getAllTodos(url) {
  const response = await fetch(url, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    }
  });
  const data = await response.json();
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  (data.context).forEach(todo => {
    const todoHTMLElement = `
        <li>
          <p>Task: ${todo.task}</p>
          <p>Completed?: ${todo.completed}</p>
        </li>`
    todoList.innerHTML += todoHTMLElement;
  });
}

const operationGetAllTodos = async (url) => {
  const r = await fetch(url, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    }
  })
  const dt = await r.json();
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  (dt.context).forEach(todo => {
    const todoHTMLElement = `
        <li>
          <p>Task: ${todo.task}</p>
          <p>Completed?: ${todo.completed}</p>
        </li>`
    todoList.innerHTML += todoHTMLElement;
  });
};

async function addTodo(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify({payload: payload})
  });
  const data = await response.json();
  console.log(data);
}

async function updateTodo(url, payload) {
  const response = await fetch(url, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify({payload: payload})
  });
  const data = await response.json();
  console.log(data);
}

async function deleteTodo(url) {
  const response = await fetch(url, {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": getCookie("csrftoken"),
    }
  });
  const data = await response.json();
  console.log(data);
}
