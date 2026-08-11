import React from 'react';
import { ClipboardCheck, Dumbbell, Flame } from 'lucide-react';

export default function MetricsDashboard({ 
  completionPercent, 
  activeTask, 
  streakDays 
}) {
  return (
    <section class="metrics-grid">
      <div class="metric-card">
        <div class="metric-icon blue">
          <ClipboardCheck size={26} />
        </div>
        <div class="metric-info" style={{ width: '100%' }}>
          <h3>Tiến Độ Bài Tập Trong Ngày</h3>
          <div class="metric-value"><span>{completionPercent}</span>% Hoàn Thành</div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style={{ width: `${completionPercent}%` }}></div>
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon green">
          <Dumbbell size={26} />
        </div>
        <div class="metric-info">
          <h3>Chế Độ Tập Luyện</h3>
          <div class="metric-value" style={{ fontSize: '1.2rem', color: '#10b981' }}>
            5 Buổi Push - Pull - Leg
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon amber">
          <Flame size={26} />
        </div>
        <div class="metric-info">
          <h3>Chuỗi Ngày Tập (Streak)</h3>
          <div class="metric-value"><span>{streakDays}</span> Ngày Liên Tục</div>
        </div>
      </div>
    </section>
  );
}
