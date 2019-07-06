class Task {
  constructor(name) {
    this.name = name;
  }
}

class UI {
  static displayTasks() {
    const tasks = Store.getTasks();
    tasks.forEach(task => UI.addTaskToList(task));
  }

  static addTaskToList(task) {
    const list = document.getElementById("task-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.name}</td>    
          
      <td><i class = 'far fa-check-circle green check'></i></td>    
      
      <td><i class = 'far fa-times-circle red remove'></i></td>    
    `;

    list.appendChild(row);
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector(".add-item");
    container.insertBefore(div, form);

    // vanish in 3s
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  static deleteTask(el) {
    if (el.classList.contains("remove")) {
      el.parentElement.parentElement.remove();
      UI.showAlert("Task Removed", "success");
      Store.removeTask(
        el.parentElement.previousElementSibling.previousElementSibling
          .textContent
      );
    }
  }
  static checkTask(el) {
    if (el.classList.contains("check")) {
      el.parentElement.parentElement.style.opacity = 0.4;
      UI.showAlert("Task complete", "success");
    }
  }
}

class Store {
  static getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
  }
  static addTask(task) {
    const tasks = Store.getTasks();

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  static removeTask(remTask) {
    const tasks = Store.getTasks();
    tasks.forEach((task, index) => {
      if (task.name === remTask) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

document.addEventListener("DOMContentLoaded", UI.displayTasks);

document.querySelector("#add-btn").addEventListener("click", e => {
  const name = document.querySelector("#item-text").value;
  if (name.trim() === "") {
    UI.showAlert("Please Fill out all Fields", "error");
    document.querySelector("#item-text").value = "";
  } else {
    const task = new Task(name);
    document.querySelector("#item-text").value = "";
    UI.addTaskToList(task);
    Store.addTask(task);
    UI.showAlert("Task added", "success");
  }
});

document.querySelector("#task-list").addEventListener("click", e => {
  UI.deleteTask(e.target);
  UI.checkTask(e.target);
});
