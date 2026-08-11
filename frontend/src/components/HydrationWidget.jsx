import React from 'react';
import { GlassWater } from 'lucide-react';

export default function HydrationWidget({ currentWater, targetWater, onAddWater, onResetWater }) {
  const percentage = Math.min(Math.round((currentWater / targetWater) * 100), 100);

  return (
    <div class="widget-card">
      <div class="widget-header">
        <div class="widget-title">
          <GlassWater size={20} style={{ color: 'var(--primary-cyan)' }} /> Real-Time Hydration Logger
        </div>
        <button class="btn" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} onClick={onResetWater}>
          Reset
        </button>
      </div>
      <div class="water-tracker-content">
        <div class="water-visual">
          <div class="water-fill" style={{ height: `${percentage}%` }}></div>
        </div>
        <div class="water-stats">
          <div class="water-amount">
            {currentWater} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>ml</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Target: {targetWater.toLocaleString()} ml daily for peak performance
          </p>
          <div class="water-buttons">
            <button class="btn" onClick={() => onAddWater(250)}>+250 ml</button>
            <button class="btn" onClick={() => onAddWater(500)}>+500 ml</button>
            <button class="btn btn-primary" onClick={() => onAddWater(750)}>+750 ml</button>
          </div>
        </div>
      </div>
    </div>
  );
}
