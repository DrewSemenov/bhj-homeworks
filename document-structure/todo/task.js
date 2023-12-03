class ToDoList {
  form = document.forms[0];
  content = document.querySelector('.content');
  tasksList = this.content.querySelector('.tasks__list');
  tasksInput = this.content.querySelector('.tasks__input');

  tasksArray = localStorage.tasksArray
    ? JSON.parse(localStorage.tasksArray)
    : [];

  constructor() {
    this.startApp();
  }

  startApp() {
    this.registerEvent();

    if (this.tasksArray.length) {
      this.renderTasks();
    }
  }

  registerEvent() {
    this.form.addEventListener('submit', (event) => this.submitEvent(event));
    this.tasksList.addEventListener('click', (event) => this.deleteTask(event));
  }

  renderTasks() {
    this.tasksArray.forEach((task) => this.addTask(task, false));
  }

  saveTasksToStorage(task) {
    if (task) {
      this.tasksArray.push(task);
    }

    localStorage.tasksArray = JSON.stringify(this.tasksArray);
  }

  submitEvent(event) {
    event.preventDefault();

    const task = this.tasksInput.value.trim();

    if (task) {
      this.addTask(task);
    } else {
      this.showError();
    }

    this.clearInput();
  }

  showError() {
    this.tasksInput.classList.add('tasks__input_error');
    this.tasksInput.placeholder = 'Невозможно добавить пустую задачу';

    setTimeout(() => {
      this.tasksInput.classList.remove('tasks__input_error');
      this.tasksInput.placeholder = 'Введите название новой задачи';
    }, 1000);
  }

  addTask(task, save = true) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = this.getTaskHtml(task);
    this.tasksList.append(taskElement);

    if (save) {
      this.saveTasksToStorage(task);
    }
  }

  getTaskHtml(task) {
    return `
    <div class="task__title">${task}</div>
    <a
      href="#"
      class="task__remove"
    >
      &times;
    </a>
  `;
  }

  clearInput() {
    this.tasksInput.value = '';
  }

  deleteTask(event) {
    const buttonDelete = event.target.closest('.task__remove');

    if (!buttonDelete) return;

    const task = buttonDelete.closest('.task');
    const index = [...this.tasksList.children].indexOf(task);

    task.remove();

    this.tasksArray.splice(index, 1);
    this.saveTasksToStorage();
  }
}

const todoList = new ToDoList();
