const domOutput = document.getElementById('output');
const domInput = document.getElementById('input');
const domButton = document.getElementById('enter');

const todos = [];

// LISTENERS METHODS
const onCreateTodoButtonClick = function(event) {
  console.log('domButton -> onclick: 0) - check input is not empty');

  if (checkInputWithText()) {
    todos.push(domInput.value);
    renderTodos();
    domInput.value = '';

  }
  else renderAlert('Wrong input');
}
const onInputTextInput = function() {
  renderInputHighlightColor("");
}
const onTodoDeleteClick = function(event) {
  console.log('todoDelete -> onTodoDeleteClick', event);
  const btn = event.currentTarget;
  const index = btn.dataset.index;
  console.log('todoDelete -> onTodoDeleteClick', { index });
  todos.splice(parseInt(index), 1);
  renderTodos();
}
// LISTENERS ENDs

// LOGICAL METHODS
const checkInputWithText = () => domInput.value.length > 0 && isNaN(domInput.value);
// LOGICAL ENDs

// RENDER METHODS
const renderAlert = function(message) {
  renderInputHighlightColor("red");
  alert(message);
}
const renderTodos = () => { 
  domOutput.innerHTML = '';
  console.log('renderTodos:', todos); 
  for (let index = 0; index < todos.length; index++) { 
    const todoItem = todos[index];   
    console.log('renderTodos -> todoItem:', todoItem); 
    renderTodo(index, todoItem);
  } 
}
const renderInputTextInOutput = function() {
  console.log('domButton -> onclick: 1) - add todo');

  renderTodos(todos.length, domInput.value);

  console.log('domButton -> onclick: 2) - clear input');
  domInput.value = '';
}
const renderTodo = (index, text) => {
  const domTodoContainer = document.createElement('div');

  const domTodoButtonDelete = createActionButtonWithText('delete');
  domTodoButtonDelete.dataset.index = index;
  domTodoButtonDelete.onclick = onTodoDeleteClick;

  domTodoContainer.innerText = `${index}. ${text}`;

  domTodoContainer.appendChild(domTodoButtonDelete);
  domOutput.appendChild(domTodoContainer);
  
}
const renderInputHighlightColor = (color) => domInput.style.backgroundColor = color;
// RENDER ENDs

// UTILS Methods
const createActionButtonWithText = (text) => {
  const btn = document.createElement('button');
  btn.innerText = text;
  btn.style.backgroundColor = 'red';
  btn.style.marginLeft = '12px';
  btn.style.border = 'solid 2px';
  btn.style.borderColor = 'green';
  return btn;
}
// UTILS ENDs

domButton.onclick = onCreateTodoButtonClick;
domInput.oninput = onInputTextInput;
