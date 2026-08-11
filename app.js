// Real-Time Fitness Checklist Application Logic

let tasks = [];
let activeCategory = 'All';
let currentWater = 0;
const WATER_TARGET = 3000;

// Timer State
let timerSeconds = 45 * 60;
let initialTimerSeconds = 45 * 60;
let timerInterval = null;
let isTimerRunning = false;

// Default TXT Template if file fetch fails
const DEFAULT_TXT_SCHEDULE = `# REAL-TIME DAILY FITNESS & WELLNESS CHECKLIST
# Format: [HH:MM] Task Name | Category | Priority | Details

[06:30] Morning Hydration (500ml water + electrolytes) | Hydration | High | 500ml water
[07:00] 10-Minute Morning Sun Walk & Light Mobility Stretches | Cardio | Medium | 10 mins walk
[07:30] High-Protein Breakfast & Daily Multivitamins | Nutrition | High | 30g Protein
[09:30] Ergonomic Posture Check & Hydration Break | Wellness | Low | 300ml water
[11:00] Mid-Morning Movement Break & Core Activation | Exercise | Medium | 5 mins stretch
[12:30] Balanced Macro Lunch & 15-min Post-Meal Walk | Nutrition | High | Balanced Macros
[15:00] Pre-Workout Hydration & Energy Snack | Nutrition | Medium | Banana / Carb snack
[16:30] Main Workout Routine (Strength / HIIT / Cardio) | Exercise | High | 45 mins workout
[17:30] Post-Workout Cool Down & Foam Rolling | Recovery | Medium | 15 mins stretch
[18:00] Post-Workout Protein Shake & Hydration | Nutrition | High | 25g Protein
[19:30] Nutrient-Dense Dinner & Hydration Target | Nutrition | High | Clean Dinner
[21:00] Evening Wind-Down & Stretching | Recovery | Medium | 20 mins relax
[22:00] Final Water Check & Sleep Environment Setup | Sleep | High | 8 hours sleep target`;

document.addEventListener('DOMContentLoaded', async () => {
  initClock();
  initWaterTracker();
  initTimer();
  initEventListeners();
  await loadTxtSchedule();
});

// --- 1. Real-Time Clock Engine ---
function initClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  
  // Format Time HH:MM:SS
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('liveClock').textContent = `${hours}:${minutes}:${seconds}`;

  // Format Date
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  document.getElementById('liveDate').textContent = now.toLocaleDateString('en-US', options);

  // Check active real-time task every minute
  highlightActiveTask(now);
}

// --- 2. Schedule Parsing & Real-Time Highlighting ---
async function loadTxtSchedule() {
  let rawText = '';
  try {
    const response = await fetch('New Text Document.txt?t=' + Date.now());
    if (response.ok) {
      rawText = await response.text();
    }
  } catch (err) {
    console.warn('Could not fetch New Text Document.txt directly, using local fallback/storage', err);
  }

  if (!rawText || rawText.trim() === '') {
    rawText = localStorage.getItem('fitpulse_schedule_txt') || DEFAULT_TXT_SCHEDULE;
  }

  parseAndRenderSchedule(rawText);
}

function parseAndRenderSchedule(rawText) {
  localStorage.setItem('fitpulse_schedule_txt', rawText);
  const lines = rawText.split('\n');
  const savedCompletions = JSON.parse(localStorage.getItem('fitpulse_completed_ids') || '{}');

  tasks = [];
  let idCounter = 1;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    // Match format: [HH:MM] Task Name | Category | Priority | Details
    const match = trimmed.match(/^\[(\d{2}:\d{2})\]\s*([^|]+)(?:\|\s*([^|]+))?(?:\|\s*([^|]+))?(?:\|\s*(.*))?$/);
    if (match) {
      const timeStr = match[1].trim();
      const name = match[2].trim();
      const category = (match[3] || 'General').trim();
      const priority = (match[4] || 'Medium').trim();
      const details = (match[5] || '').trim();
      const taskId = `task_${idCounter++}_${timeStr}_${name.replace(/\s+/g, '_')}`;

      tasks.push({
        id: taskId,
        time: timeStr,
        name: name,
        category: category,
        priority: priority,
        details: details,
        completed: !!savedCompletions[taskId]
      });
    }
  });

  renderChecklist();
  updateMetrics();
  highlightActiveTask(new Date());
}

function renderChecklist() {
  const grid = document.getElementById('checklistGrid');
  grid.innerHTML = '';

  const filteredTasks = tasks.filter(t => {
    if (activeCategory === 'All') return true;
    return t.category.toLowerCase() === activeCategory.toLowerCase();
  });

  if (filteredTasks.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-clipboard-list" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: var(--text-dim);"></i>
        <p>No fitness tasks found for category "<strong>${activeCategory}</strong>".</p>
      </div>
    `;
    return;
  }

  filteredTasks.forEach(task => {
    const card = document.createElement('article');
    card.className = `task-card ${task.completed ? 'completed' : ''}`;
    card.id = task.id;

    card.innerHTML = `
      <div class="task-time-box">
        <div class="task-time">${task.time}</div>
        <span class="active-badge-placeholder"></span>
      </div>

      <div class="task-content">
        <div class="task-title">${escapeHtml(task.name)}</div>
        <div class="task-meta">
          <span class="badge badge-cat-${escapeHtml(task.category)}">${escapeHtml(task.category)}</span>
          <span class="badge badge-prio-${escapeHtml(task.priority)}">${escapeHtml(task.priority)}</span>
          ${task.details ? `<span class="task-details">${escapeHtml(task.details)}</span>` : ''}
        </div>
      </div>

      <div class="task-checkbox-container">
        <div class="custom-checkbox" onclick="toggleTask('${task.id}')">
          <i class="fa-solid fa-check"></i>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  highlightActiveTask(new Date());
}

function toggleTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    
    // Save state
    const savedCompletions = JSON.parse(localStorage.getItem('fitpulse_completed_ids') || '{}');
    savedCompletions[taskId] = task.completed;
    localStorage.setItem('fitpulse_completed_ids', JSON.stringify(savedCompletions));

    renderChecklist();
    updateMetrics();
  }
}

function highlightActiveTask(now) {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let closestTask = null;
  let minDiff = Infinity;

  tasks.forEach(task => {
    const [h, m] = task.time.split(':').map(Number);
    const taskMinutes = h * 60 + m;
    
    // Consider active window: task minute up to task minute + 60 mins
    const diff = currentMinutes - taskMinutes;
    if (diff >= 0 && diff < 60) {
      if (diff < minDiff) {
        minDiff = diff;
        closestTask = task;
      }
    }
  });

  // Remove active class from all
  document.querySelectorAll('.task-card').forEach(card => {
    card.classList.remove('active-now');
    const badgePlaceholder = card.querySelector('.active-badge-placeholder');
    if (badgePlaceholder) badgePlaceholder.innerHTML = '';
  });

  const activeTaskNameEl = document.getElementById('activeTaskName');

  if (closestTask) {
    const activeCard = document.getElementById(closestTask.id);
    if (activeCard) {
      activeCard.classList.add('active-now');
      const badgePlaceholder = activeCard.querySelector('.active-badge-placeholder');
      if (badgePlaceholder) {
        badgePlaceholder.innerHTML = `<div class="active-tag">ACTIVE NOW</div>`;
      }
    }
    if (activeTaskNameEl) {
      activeTaskNameEl.textContent = `${closestTask.time} - ${closestTask.name}`;
    }
  } else {
    if (activeTaskNameEl) {
      activeTaskNameEl.textContent = 'None Active Currently';
    }
  }
}

function updateMetrics() {
  const total = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  document.getElementById('completionPercent').textContent = percent;
  document.getElementById('completionBar').style.width = `${percent}%`;
}

// --- 3. Hydration Tracker ---
function initWaterTracker() {
  currentWater = parseInt(localStorage.getItem('fitpulse_water') || '0', 10);
  updateWaterDisplay();
}

function addWater(amount) {
  currentWater += amount;
  if (currentWater > 5000) currentWater = 5000;
  localStorage.setItem('fitpulse_water', currentWater);
  updateWaterDisplay();
}

function updateWaterDisplay() {
  document.getElementById('waterValue').textContent = currentWater;
  document.getElementById('hydrationTotal').textContent = currentWater;
  
  const percentage = Math.min(Math.round((currentWater / WATER_TARGET) * 100), 100);
  document.getElementById('waterFill').style.height = `${percentage}%`;
}

document.getElementById('btnResetWater').addEventListener('click', () => {
  currentWater = 0;
  localStorage.setItem('fitpulse_water', '0');
  updateWaterDisplay();
});

// --- 4. Interval Timer Widget ---
function initTimer() {
  updateTimerDisplay();
  
  document.getElementById('btnTimerStart').addEventListener('click', startTimer);
  document.getElementById('btnTimerPause').addEventListener('click', pauseTimer);
  document.getElementById('btnTimerReset').addEventListener('click', resetTimer);
}

function updateTimerDisplay() {
  const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const s = String(timerSeconds % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${m}:${s}`;
}

function startTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
    } else {
      pauseTimer();
      alert('⏰ Interval Timer Finished! Great work!');
    }
  }, 1000);
}

function pauseTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  pauseTimer();
  timerSeconds = initialTimerSeconds;
  updateTimerDisplay();
}

// --- 5. Event Listeners & Modals ---
function initEventListeners() {
  // Category Filter Pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      activeCategory = e.target.getAttribute('data-category');
      renderChecklist();
    });
  });

  // Edit TXT Modal
  const editorModal = document.getElementById('editorModal');
  const btnEditTxt = document.getElementById('btnEditTxt');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelModal = document.getElementById('btnCancelModal');
  const btnSaveTxtContent = document.getElementById('btnSaveTxtContent');
  const txtEditorContent = document.getElementById('txtEditorContent');

  btnEditTxt.addEventListener('click', () => {
    const rawTxt = localStorage.getItem('fitpulse_schedule_txt') || DEFAULT_TXT_SCHEDULE;
    txtEditorContent.value = rawTxt;
    editorModal.classList.add('active');
  });

  const closeModal = () => editorModal.classList.remove('active');
  btnCloseModal.addEventListener('click', closeModal);
  btnCancelModal.addEventListener('click', closeModal);

  btnSaveTxtContent.addEventListener('click', () => {
    const newContent = txtEditorContent.value;
    parseAndRenderSchedule(newContent);
    closeModal();
  });

  // Import TXT File
  const btnUploadTxt = document.getElementById('btnUploadTxt');
  const fileInput = document.getElementById('fileInput');

  btnUploadTxt.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        parseAndRenderSchedule(text);
        alert(`Successfully imported fitness checklist from "${file.name}"!`);
      };
      reader.readAsText(file);
    }
  });

  // Export TXT File
  document.getElementById('btnExportTxt').addEventListener('click', () => {
    const content = localStorage.getItem('fitpulse_schedule_txt') || DEFAULT_TXT_SCHEDULE;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FitPulse_RealTime_Schedule.txt';
    link.click();
    URL.revokeObjectURL(url);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
