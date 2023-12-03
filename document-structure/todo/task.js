class ToDoList {
  content = document.querySelector('.content');
  tasksInput = this.content.querySelector('.tasks__input');
  tasksList = this.content.querySelector('.tasks__list');
  form = document.forms[0];

  list = [];

  constructor() {
    this.registerEvent();
  }

  registerEvent() {
    this.form.addEventListener('submit', (event) => this.submitEvent(event));
    this.tasksList.addEventListener('click', (event) => this.deleteTask(event));
  }

  submitEvent(event) {
    event.preventDefault();

    const task = this.tasksInput.value.trim();

    if (!task) return;

    this.addTask(task);
    this.clearInput();
  }

  addTask(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = this.getTaskHtml(task);

    this.tasksList.append(taskElement);
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

    task.remove();
  }
}

const todoList = new ToDoList();
