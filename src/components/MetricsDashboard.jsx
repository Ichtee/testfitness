import React from 'react';
import { ListCheck, Clock, Flame, Droplet } from 'lucide-react';

export default function MetricsDashboard({ 
  completionPercent, 
  activeTask, 
  streakDays, 
  currentWater, 
  targetWater 
}) {
  return (
    <section class="metrics-grid">
      <div class="metric-card">
        <div class="metric-icon blue">
          <ListCheck size={26} />
        </div>
        <div class="metric-info" style={{ width: '100%' }}>
          <h3>Daily Completion</h3>
          <div class="metric-value"><span>{completionPercent}</span>%</div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style={{ width: `${completionPercent}%` }}></div>
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon green">
          <Clock size={26} />
        </div>
        <div class="metric-info">
          <h3>Active Now</h3>
          <div class="metric-value" style={{ fontSize: '1.1rem', color: '#10b981' }}>
            {activeTask ? `${activeTask.time} - ${activeTask.name}` : 'None Active Currently'}
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon amber">
          <Flame size={26} />
        </div>
        <div class="metric-info">
          <h3>Active Streak</h3>
          <div class="metric-value"><span>{streakDays}</span> Days</div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon purple">
          <Droplet size={26} />
        </div>
        <div class="metric-info">
          <h3>Hydration Logged</h3>
          <div class="metric-value"><span>{currentWater}</span> / {targetWater} ml</div>
        </div>
      </div>
    </section>
  );
}
