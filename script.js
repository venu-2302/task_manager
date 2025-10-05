document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addBtn = document.getElementById('add-btn');
  const taskList = document.getElementById('task-list');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Render tasks on page load
  renderTasks();

  // Add Task
  addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      taskInput.value = '';
      saveAndRender();
    }
  });

  // Render Tasks
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');

      // Task text
      const span = document.createElement('span');
      span.textContent = task.text;
      if (task.completed) li.classList.add('completed');

      // Toggle complete on click
      span.addEventListener('click', () => {
        tasks[index].completed = !tasks[index].completed;
        saveAndRender();
      });

      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => {
        const newText = prompt('Edit task:', task.text);
        if (newText) {
          tasks[index].text = newText;
          saveAndRender();
        }
      });

      // Delete button
      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveAndRender();
      });

      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
    updateProgress();
  }

  // Update Progress
  function updateProgress() {
  if (tasks.length === 0) {
    progressFill.style.width = '0%';
    progressText.textContent = '0%';
    return;
  }
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const percent = Math.round((completedTasks / tasks.length) * 100);

  // Update UI
  progressFill.style.width = percent + '%';
  progressText.textContent = percent + '%';
}


  // Save and re-render
  function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
});
