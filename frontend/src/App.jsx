import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import MetricsDashboard from './components/MetricsDashboard';
import ChecklistTimeline from './components/ChecklistTimeline';
import TxtEditorModal from './components/TxtEditorModal';
import ExerciseDetailModal from './components/ExerciseDetailModal';
import { fetchScheduleFromApi, saveScheduleToApi } from './services/scheduleService';

const DEFAULT_TXT_SCHEDULE = `# ========================================================
# FITPULSE 5-DAY PUSH - PULL - LEG WORKOUT ROUTINE
# Formatted: Task Name | Category | Priority | Details
# ========================================================

# --- THỨ 2 (MONDAY): BUỔI 1 – PUSH ---
1. Pec Deck Fly | Exercise | High | 3 sets x 10-12 reps
2. Incline Dumbbell Chest Press | Exercise | High | 3 sets x 8-10 reps
3. Shoulder Press Machine | Exercise | High | 3 sets x 8-10 reps
4. Chest Supported Dumbbell Lateral Raise | Exercise | Medium | 3 sets x 12-15 reps
5. Overhead Cable Triceps Extension | Exercise | Medium | 3 sets x 12 reps

# --- THỨ 3 (TUESDAY): BUỔI 2 – PULL ---
1. Straight Arm Pulldown | Exercise | Medium | 3 sets x 15 reps
2. Lat Pulldown | Exercise | High | 3 sets x 10-12 reps
3. Chest Supported T-Bar Row | Exercise | High | 3 sets x 8-10 reps
4. Seated Cable Row | Exercise | High | 3 sets x 10-12 reps
5. Pec Deck Rear Delt Fly | Exercise | Medium | 3 sets x 12 reps
6. EZ Bar Cable Bicep Curl | Exercise | Medium | 3 sets x 12 reps

# --- THỨ 4 (WEDNESDAY): BUỔI 3 – LEG ---
1. Lying Leg Curl | Exercise | Medium | 3 sets x 10 reps
2. Leg Extension | Exercise | Medium | 3 sets x 12-15 reps
3. Hack Squat | Exercise | High | 3 sets x 8-10 reps
4. Leg Press | Exercise | High | 3 sets x 12 reps
5. Bulgarian Split Squat | Exercise | High | 2 sets x 12 reps (mỗi chân)
6. Standing Calf Raise | Exercise | Medium | 4 sets x 15 reps

# --- THỨ 5 (THURSDAY): BUỔI 4 – PUSH PULL MIX ---
1. Cable Lateral Raise | Exercise | Medium | 3 sets x 10 reps (mỗi tay)
2. Smith Shoulder Press | Exercise | High | 3 sets x 8-10 reps
3. Smith Incline Press | Exercise | High | 3 sets x 10 reps
4. Reverse Face Rope Triceps Pushdown | Exercise | Medium | 3 sets x 12 reps
5. Assisted Pull Up | Exercise | High | 3 sets x 12 reps
6. Bench Support Incline Cable Curl | Exercise | Medium | 3 sets x 10-12 reps

# --- THỨ 6 (FRIDAY): BUỔI 5 – LOWER ---
1. Adductor Machine | Exercise | Low | 3 sets x 12-15 reps
2. Leg Press | Exercise | High | 3 sets x 10 reps
3. Dumbbell RDL (Romanian Deadlift) | Exercise | High | 3 sets x 10 reps
4. Seated Leg Curl | Exercise | Medium | 3 sets x 10-12 reps
5. Hip Thrust | Exercise | High | 3 sets x 12 reps
6. Seated Calf Raise | Exercise | Medium | 4 sets x 15 reps

# --- THỨ 7 & CHỦ NHẬT (REST DAYS) ---
Nghỉ ngơi & Phục hồi cơ bắp | Recovery | Low | Active Recovery / Nghỉ hoàn toàn`;

export default function App() {
  const [timeStr, setTimeStr] = useState('00:00:00');
  const [dateStr, setDateStr] = useState('');
  const [rawTxtContent, setRawTxtContent] = useState('');
  const [tasks, setTasks] = useState([]);
  
  const getTodayKey = () => {
    const dayNum = new Date().getDay();
    switch (dayNum) {
      case 1: return 'Mon';
      case 2: return 'Tue';
      case 3: return 'Wed';
      case 4: return 'Thu';
      case 5: return 'Fri';
      default: return 'Weekend';
    }
  };

  const [todayKey, setTodayKey] = useState(getTodayKey());
  const [selectedDay, setSelectedDay] = useState(getTodayKey());
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Modals
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedExerciseForModal, setSelectedExerciseForModal] = useState(null);

  const fileInputRef = useRef(null);

  const loadSchedule = useCallback(async () => {
    let content = await fetchScheduleFromApi();
    if (!content || content.trim() === '') {
      content = localStorage.getItem('fitpulse_mvc_schedule') || DEFAULT_TXT_SCHEDULE;
    }
    parseSchedule(content);
  }, []);

  const parseSchedule = (rawText) => {
    setRawTxtContent(rawText);
    localStorage.setItem('fitpulse_mvc_schedule', rawText);

    const savedCompletions = JSON.parse(localStorage.getItem('fitpulse_completed_ids') || '{}');
    const savedOriginals = JSON.parse(localStorage.getItem('fitpulse_original_names') || '{}');
    const lines = rawText.split('\n');
    const parsed = [];
    let counter = 1;
    let currentDayKey = 'Mon';

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed.startsWith('#')) {
        const upper = trimmed.toUpperCase();
        if (upper.includes('THỨ 2') || upper.includes('MONDAY') || upper.includes('BUỔI 1')) {
          currentDayKey = 'Mon';
        } else if (upper.includes('THỨ 3') || upper.includes('TUESDAY') || upper.includes('BUỔI 2')) {
          currentDayKey = 'Tue';
        } else if (upper.includes('THỨ 4') || upper.includes('WEDNESDAY') || upper.includes('BUỔI 3')) {
          currentDayKey = 'Wed';
        } else if (upper.includes('THỨ 5') || upper.includes('THURSDAY') || upper.includes('BUỔI 4')) {
          currentDayKey = 'Thu';
        } else if (upper.includes('THỨ 6') || upper.includes('FRIDAY') || upper.includes('BUỔI 5')) {
          currentDayKey = 'Fri';
        } else if (upper.includes('THỨ 7') || upper.includes('CHỦ NHẬT') || upper.includes('REST')) {
          currentDayKey = 'Weekend';
        }
        return;
      }

      const match = trimmed.match(/^(?:\[(\d{2}:\d{2})\]\s*)?([^|]+)(?:\|\s*([^|]+))?(?:\|\s*([^|]+))?(?:\|\s*(.*))?$/);
      if (match) {
        const timeStr = match[1] ? match[1].trim() : '';
        const name = match[2].trim();
        const category = (match[3] || 'Exercise').trim();
        const priority = (match[4] || 'Medium').trim();
        const details = (match[5] || '').trim();
        const taskId = `task_${counter++}_${currentDayKey}_${name.replace(/\s+/g, '_')}`;

        const storedOriginal = savedOriginals[taskId];
        const originalName = storedOriginal || name;
        const isSubstituted = storedOriginal && storedOriginal !== name;

        parsed.push({
          id: taskId,
          day: currentDayKey,
          time: timeStr,
          name,
          originalName,
          isSubstituted,
          category,
          priority,
          details,
          completed: !!savedCompletions[taskId]
        });
      }
    });

    setTasks(parsed);
  };

  const handleSaveSchedule = async (newText) => {
    parseSchedule(newText);
    await saveScheduleToApi(newText);
  };

  // Swap exercise with an alternative
  const handleSwapAlternative = (taskId, newExerciseName) => {
    setTasks((prev) => {
      const savedOriginals = JSON.parse(localStorage.getItem('fitpulse_original_names') || '{}');
      const updated = prev.map((t) => {
        if (t.id === taskId) {
          const baseOriginal = t.originalName || t.name;
          savedOriginals[t.id] = baseOriginal;
          
          const oldNumMatch = baseOriginal.match(/^(\d+\.\s*)/);
          const prefix = oldNumMatch ? oldNumMatch[1] : '';
          const newFullName = `${prefix}${newExerciseName} (Thay thế)`;

          return {
            ...t,
            originalName: baseOriginal,
            name: newFullName,
            isSubstituted: true
          };
        }
        return t;
      });

      localStorage.setItem('fitpulse_original_names', JSON.stringify(savedOriginals));
      return updated;
    });
  };

  // Revert back to original exercise
  const handleRevertOriginal = (taskId) => {
    setTasks((prev) => {
      const savedOriginals = JSON.parse(localStorage.getItem('fitpulse_original_names') || '{}');
      delete savedOriginals[taskId];
      localStorage.setItem('fitpulse_original_names', JSON.stringify(savedOriginals));

      const updated = prev.map((t) => {
        if (t.id === taskId) {
          const original = t.originalName || t.name;
          return {
            ...t,
            name: original,
            isSubstituted: false
          };
        }
        return t;
      });
      return updated;
    });
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${h}:${m}:${s}`);

      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      setDateStr(now.toLocaleDateString('en-US', options));

      const currentDay = getTodayKey();
      setTodayKey(currentDay);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

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

  const handleImportClick = () => fileInputRef.current && fileInputRef.current.click();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;
        handleSaveSchedule(text);
        alert(`Successfully imported schedule from "${file.name}"!`);
      };
      reader.readAsText(file);
    }
  };

  const handleExportClick = () => {
    const blob = new Blob([rawTxtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FitPulse_PPL_Routine.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const displayedTasks = tasks.filter((t) => selectedDay === 'All' || t.day === selectedDay);
  const totalCount = displayedTasks.length;
  const completedCount = displayedTasks.filter((t) => t.completed).length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

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
        activeTask={null}
        streakDays={1}
      />

      <ChecklistTimeline
        tasks={tasks}
        selectedDay={selectedDay}
        todayKey={todayKey}
        onSelectDay={setSelectedDay}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onToggleTask={handleToggleTask}
        onOpenExerciseDetail={(task) => setSelectedExerciseForModal(task)}
      />

      <TxtEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        rawTxtContent={rawTxtContent}
        onSave={handleSaveSchedule}
      />

      <ExerciseDetailModal
        isOpen={!!selectedExerciseForModal}
        onClose={() => setSelectedExerciseForModal(null)}
        exercise={selectedExerciseForModal}
        onSwapAlternative={handleSwapAlternative}
        onRevertOriginal={handleRevertOriginal}
      />
    </div>
  );
}
