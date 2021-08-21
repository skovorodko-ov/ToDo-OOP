'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted, todoButtons) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDOList')));
    this.todoContainer = document.querySelector('.todo-container');
  }

  addToStorage() {
    localStorage.setItem('toDOList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.input.value = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
    `);

    if (todo.comleted) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        comleted: false,
        key: this.generatKey()
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
    } else {
      alert('Пустое дело добавить нельзя!');
    }
  }

  generatKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(e) {
    let key = e.target.parentNode.parentNode.key;
    this.todoData.forEach((item, index) => {
      if (item.key === key) {
        this.todoData.delete(item.key);
        this.render();
      }
      
    });
  }

  completedItem(e) {
    let key = e.target.parentNode.parentNode.key;
    this.todoData.forEach((item) => {
      if (item.key === key) {
        item.comleted = !item.comleted;
        this.render();
      }
    });
  }

  handler() {
    this.todoContainer.addEventListener('click', (e) => {
      if (e.target.className === 'todo-complete') {
        this.completedItem(e);
      } else {
        if (e.target.className === 'todo-remove') {
          this.deleteItem(e);
        }
      }
    });
  }

  init(){
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
todo.handler();


