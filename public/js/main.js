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

   // Sample tasks
   let tasks = [];

   // Function to save tasks to localStorage
   function saveTasks() {
       localStorage.setItem('tasks', JSON.stringify(tasks));
   }

   function loadTasks() {
    const tasksData = JSON.parse(localStorage.getItem('tasks'));
    if (tasksData) {
        tasks = tasksData;
    }
}

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
    <div class="task" draggable="true">
      <h3>${title}</h3>
      <p>${description}</p>
      <p>Due Date: ${dueDate}</p>
      <p>Priority: ${priority}</p>
      <button class="btn btn-danger delete-btn">Delete</button>
      </div>
    `;

       // Event listener for task deletion
       task.querySelector('.delete-btn').addEventListener('click', function() {
          const index = tasks.findIndex(task => task.title === title);
          tasks.splice(index, 1);
          saveTasks();
          task.remove();

      });
    return task;
  }

  function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // Event listener for task deletion
  $(document).on('click', '.delete-btn', function() {
    const taskIndex = $(this).closest('.task-card').data('index');
    tasks.splice(taskIndex, 1);
    saveTasks();
    renderTasks();
});
});

// Add event listeners for drag and drop
pendingTasks.addEventListener('dragover', function(event) {
  event.preventDefault();
});

pendingTasks.addEventListener('drop', function(event) {
  const task = document.querySelector('.task.dragging');
  pendingTasks.appendChild(task);
});

inProgressTasks.addEventListener('dragover', function(event) {
  event.preventDefault();
});

inProgressTasks.addEventListener('drop', function(event) {
  const task = document.querySelector('.task.dragging');
  inProgressTasks.appendChild(task);
});

completedTasks.addEventListener('dragover', function(event) {
  event.preventDefault();
});

completedTasks.addEventListener('drop', function(event) {
  const task = document.querySelector('.task.dragging');
  completedTasks.appendChild(task);
});

// Add event listener for drag end to remove the dragging class
document.addEventListener('dragend', function(event) {
  const draggingTask = document.querySelector('.task.dragging');
  if (draggingTask) {
    draggingTask.classList.remove('dragging');
  }
});

// Add event listener for drag start to add the dragging class
document.addEventListener('dragstart', function(event) {
  if (event.target.classList.contains('task')) {
    event.target.classList.add('dragging');
  }
});

