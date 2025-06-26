// app.js

// === TASK PLANNER ===
if (document.getElementById('taskForm')) {
  const form = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskDate = document.getElementById('taskDate');
  const taskList = document.getElementById('taskList');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      text: taskInput.value,
      date: taskDate.value
    };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    taskDate.value = '';
    renderTasks();
  });

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.innerHTML = `
        <span>${task.text} ${task.date ? `<small>- ${task.date}</small>` : ''}</span>
        <button onclick="deleteTask(${task.id})">❌</button>
      `;
      taskList.appendChild(li);
    });
  }

  window.deleteTask = function(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  };
}

// === JOURNAL ===
if (document.getElementById('journalInput')) {
  const journalInput = document.getElementById('journalInput');
  const entriesContainer = document.getElementById('entries');

  function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    entriesContainer.innerHTML = '';
    entries.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'journal-entry';
      div.innerHTML = `
        <p>${entry.text}</p>
        <small>${entry.date}</small>
        <hr />
      `;
      entriesContainer.appendChild(div);
    });
  }

  window.saveEntry = function () {
    const content = journalInput.value.trim();
    if (content === '') return;

    const entry = {
      text: content,
      date: new Date().toLocaleString()
    };

    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    entries.unshift(entry);
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    journalInput.value = '';
    displayEntries();
  };

  displayEntries();
}

// === MOOD TRACKER ===
if (document.getElementById('moodNote')) {
  let selectedMood = '';
  const moodNote = document.getElementById('moodNote');
  const moodHistoryContainer = document.getElementById('moodHistory');

  window.selectMood = function (mood) {
    selectedMood = mood;
    document.querySelectorAll('.mood-options button').forEach(btn => btn.classList.remove('active-mood'));
    event.target.classList.add('active-mood');
  };

  window.saveMood = function () {
    if (!selectedMood) {
      alert('Please select a mood!');
      return;
    }

    const entry = {
      mood: selectedMood,
      note: moodNote.value.trim(),
      date: new Date().toLocaleString()
    };

    const moods = JSON.parse(localStorage.getItem('moodEntries')) || [];
    moods.unshift(entry);
    localStorage.setItem('moodEntries', JSON.stringify(moods));

    selectedMood = '';
    moodNote.value = '';
    document.querySelectorAll('.mood-options button').forEach(btn => btn.classList.remove('active-mood'));
    showMoodHistory();
  };

  function showMoodHistory() {
    const moods = JSON.parse(localStorage.getItem('moodEntries')) || [];
    moodHistoryContainer.innerHTML = '';
    moods.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'mood-entry';
      div.innerHTML = `
        <p><strong>${entry.mood}</strong> — ${entry.note || 'No note'}<br/><small>${entry.date}</small></p>
        <hr />
      `;
      moodHistoryContainer.appendChild(div);
    });
  }

  showMoodHistory();
}
