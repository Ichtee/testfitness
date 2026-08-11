import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

export default function WorkoutTimerWidget() {
  const [seconds, setSeconds] = useState(45 * 60);
  const [initialSeconds, setInitialSeconds] = useState(45 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            alert('⏰ Interval Timer Finished! Great work!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  };

  const setPreset = (mins) => {
    setIsRunning(false);
    setInitialSeconds(mins * 60);
    setSeconds(mins * 60);
  };

  return (
    <div class="widget-card">
      <div class="widget-header">
        <div class="widget-title">
          <Timer size={20} style={{ color: 'var(--accent-emerald)' }} /> Exercise & Rest Timer
        </div>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          <button class="btn" style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }} onClick={() => setPreset(15)}>15m</button>
          <button class="btn" style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }} onClick={() => setPreset(30)}>30m</button>
          <button class="btn" style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }} onClick={() => setPreset(45)}>45m</button>
        </div>
      </div>
      <div class="timer-display">{formatTime(seconds)}</div>
      <div class="timer-controls">
        {!isRunning ? (
          <button class="btn btn-primary" onClick={handleStart}><Play size={16} /> Start</button>
        ) : (
          <button class="btn" onClick={handlePause}><Pause size={16} /> Pause</button>
        )}
        <button class="btn" onClick={handleReset}><RotateCcw size={16} /> Reset</button>
      </div>
    </div>
  );
}
