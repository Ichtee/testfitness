import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import MetricsDashboard from './components/MetricsDashboard';
import HydrationWidget from './components/HydrationWidget';
import WorkoutTimerWidget from './components/WorkoutTimerWidget';
import ChecklistTimeline from './components/ChecklistTimeline';
import TxtEditorModal from './components/TxtEditorModal';

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

export default function App() {
  const [timeStr, setTimeStr] = useState('00:00:00');
  const [dateStr, setDateStr] = useState('');
  const [rawTxtContent, setRawTxtContent] = useState('');
  const [tasks, setTasks] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [currentWater, setCurrentWater] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const fileInputRef = useRef(null);

  const TARGET_WATER = 3000;

  // 1. Fetch Schedule from Node Express Server or fallback
  const fetchSchedule = useCallback(async () => {
    let textContent = '';
    try {
      const res = await fetch('/api/schedule');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.content) {
          textContent = data.content;
        }
      }
    } catch (err) {
      console.warn('Backend server not connected yet, using fallback/local storage', err);
    }

    if (!textContent || textContent.trim() === '') {
      textContent = localStorage.getItem('fitpulse_react_schedule') || DEFAULT_TXT_SCHEDULE;
    }

    parseSchedule(textContent);
  }, []);

  // 2. Parse Text File Format
  const parseSchedule = (rawText) => {
    setRawTxtContent(rawText);
    localStorage.setItem('fitpulse_react_schedule', rawText);

    const savedCompletions = JSON.parse(localStorage.getItem('fitpulse_completed_ids') || '{}');
    const lines = rawText.split('\n');
    const parsed = [];
    let counter = 1;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const match = trimmed.match(/^\[(\d{2}:\d{2})\]\s*([^|]+)(?:\|\s*([^|]+))?(?:\|\s*([^|]+))?(?:\|\s*(.*))?$/);
      if (match) {
        const timeStr = match[1].trim();
        const name = match[2].trim();
        const category = (match[3] || 'General').trim();
        const priority = (match[4] || 'Medium').trim();
        const details = (match[5] || '').trim();
        const taskId = `task_${counter++}_${timeStr}_${name.replace(/\s+/g, '_')}`;

        parsed.push({
          id: taskId,
          time: timeStr,
          name,
          category,
          priority,
          details,
          completed: !!savedCompletions[taskId]
        });
      }
    });

    setTasks(parsed);
  };

  // 3. Save Schedule back to Express Server & LocalStorage
  const handleSaveSchedule = async (newText) => {
    parseSchedule(newText);
    try {
      await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newText }),
      });
    } catch (err) {
      console.error('Failed to sync to Node.js backend:', err);
    }
  };

  // 4. Real-Time Clock & Active Task Calculation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${h}:${m}:${s}`);

      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      setDateStr(now.toLocaleDateString('en-US', options));

      // Calculate active task
      const currentMins = now.getHours() * 60 + now.getMinutes();
      let activeItem = null;
      let minDiff = Infinity;

      tasks.forEach((t) => {
        const [th, tm] = t.time.split(':').map(Number);
        const taskMins = th * 60 + tm;
        const diff = currentMins - taskMins;
        if (diff >= 0 && diff < 60) {
          if (diff < minDiff) {
            minDiff = diff;
            activeItem = t;
          }
        }
      });

      setActiveTaskId(activeItem ? activeItem.id : null);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [tasks]);

  // Load initial data
  useEffect(() => {
    fetchSchedule();
    const savedWater = parseInt(localStorage.getItem('fitpulse_water') || '0', 10);
    setCurrentWater(savedWater);
  }, [fetchSchedule]);

  // Toggle Task Completion
  const handleToggleTask = (taskId) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      const completions = {};
      updated.forEach((t) => {
        if (t.completed) completions[t.id] = true;
      });
      localStorage.setItem('fitpulse_completed_ids', JSON.stringify(completions));
      return updated;
    });
  };

  // Water Actions
  const handleAddWater = (amount) => {
    setCurrentWater((prev) => {
      const next = Math.min(prev + amount, 5000);
      localStorage.setItem('fitpulse_water', next);
      return next;
    });
  };

  const handleResetWater = () => {
    setCurrentWater(0);
    localStorage.setItem('fitpulse_water', 0);
  };

  // File Upload / Export
  const handleImportClick = () => fileInputRef.current && fileInputRef.current.click();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;
        handleSaveSchedule(text);
        alert(`Successfully imported fitness checklist from "${file.name}"!`);
      };
      reader.readAsText(file);
    }
  };

  const handleExportClick = () => {
    const blob = new Blob([rawTxtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FitPulse_React_Schedule.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Metrics
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const activeTask = tasks.find((t) => t.id === activeTaskId);

  return (
    <div class="container">
      <Header
        timeStr={timeStr}
        dateStr={dateStr}
        onOpenEditor={() => setIsEditorOpen(true)}
        onImportClick={handleImportClick}
        onExportClick={handleExportClick}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
      />

      <MetricsDashboard
        completionPercent={completionPercent}
        activeTask={activeTask}
        streakDays={1}
        currentWater={currentWater}
        targetWater={TARGET_WATER}
      />

      <section class="widgets-row">
        <HydrationWidget
          currentWater={currentWater}
          targetWater={TARGET_WATER}
          onAddWater={handleAddWater}
          onResetWater={handleResetWater}
        />
        <WorkoutTimerWidget />
      </section>

      <ChecklistTimeline
        tasks={tasks}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        activeTaskId={activeTaskId}
        onToggleTask={handleToggleTask}
      />

      <TxtEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        rawTxtContent={rawTxtContent}
        onSave={handleSaveSchedule}
      />
    </div>
  );
}
