// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskModal = document.getElementById('taskModal');
    const closeBtn = document.querySelector('.close');
    const taskForm = document.getElementById('taskForm');
    const pendingTasks = document.getElementById('pendingTasks');
    const inProgressTasks = document.getElementById('inProgressTasks');
    const completedTasks = document.getElementById('completedTasks');
  
    // Show task modal
    addTaskBtn.addEventListener('click', function() {
      taskModal.style.display = 'block';
    });
  
    // Close task modal
    closeBtn.addEventListener('click', function() {
      taskModal.style.display = 'none';
    });
  
    // Add task
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const dueDate = document.getElementById('dueDate').value;
      const priority = document.getElementById('priority').value;
  
      const task = createTask(title, description, dueDate, priority);
      pendingTasks.appendChild(task);
  
      taskForm.reset();
      taskModal.style.display = 'none';
    });
  
    // Create task
    function createTask(title, description, dueDate, priority) {
      const task = document.createElement('div');
      task.classList.add('task');
      task.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Due Date: ${dueDate}</p>
        <p>Priority: ${priority}</p>
      `;
      return task;
    }
  });
  