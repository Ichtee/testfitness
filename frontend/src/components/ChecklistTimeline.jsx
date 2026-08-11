import React from 'react';
import { Calendar, Check, ClipboardList, Dumbbell, Info, RotateCcw } from 'lucide-react';
import { getExerciseDetails } from '../data/exerciseDatabase';

const DAYS = [
  { key: 'Mon', label: 'T2 - PUSH', sub: 'Buổi 1' },
  { key: 'Tue', label: 'T3 - PULL', sub: 'Buổi 2' },
  { key: 'Wed', label: 'T4 - LEG', sub: 'Buổi 3' },
  { key: 'Thu', label: 'T5 - MIX', sub: 'Buổi 4' },
  { key: 'Fri', label: 'T6 - LOWER', sub: 'Buổi 5' },
  { key: 'Weekend', label: 'T7-CN', sub: 'Rest' },
  { key: 'All', label: 'Cả Tuần', sub: 'All' },
];

const CATEGORIES = ['All', 'Exercise', 'Recovery'];

export default function ChecklistTimeline({
  tasks,
  selectedDay,
  todayKey,
  onSelectDay,
  activeCategory,
  onSelectCategory,
  onToggleTask,
  onOpenExerciseDetail,
}) {
  const filteredTasks = tasks.filter((t) => {
    const matchDay = selectedDay === 'All' || t.day === selectedDay;
    const matchCat = activeCategory === 'All' || t.category.toLowerCase() === activeCategory.toLowerCase();
    return matchDay && matchCat;
  });

  return (
    <section>
      {/* 1. Day Selector Bar */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div class="section-title">
            <Dumbbell size={22} style={{ color: 'var(--primary-cyan)', marginRight: '0.5rem' }} /> Lịch Tập Theo Ngày
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Hôm nay: <strong style={{ color: 'var(--primary-cyan)' }}>{DAYS.find((d) => d.key === todayKey)?.label || 'Weekend'}</strong>
          </div>
        </div>

        <div class="filter-pills" style={{ gap: '0.6rem' }}>
          {DAYS.map((day) => {
            const isToday = day.key === todayKey;
            const isSelected = day.key === selectedDay;
            return (
              <button
                key={day.key}
                class={`filter-pill ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectDay(day.key)}
                style={{
                  position: 'relative',
                  padding: '0.6rem 1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '95px',
                  borderColor: isToday ? 'var(--primary-cyan)' : undefined,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{day.label}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{day.sub}</div>
                {isToday && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      background: '#10b981',
                      color: '#000',
                      fontSize: '0.55rem',
                      fontWeight: 800,
                      padding: '0.1rem 0.35rem',
                      borderRadius: '10px',
                      textTransform: 'uppercase',
                      boxShadow: '0 0 8px #10b981',
                    }}
                  >
                    HÔM NAY
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Category Filter & Header */}
      <div class="section-header" style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          <Calendar size={18} style={{ color: 'var(--primary-cyan)', verticalAlign: 'middle', marginRight: '0.4rem' }} />
          Chi tiết danh sách bài tập Gym
        </div>

        <div class="filter-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              class={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Task Checklist Grid */}
      <div class="checklist-grid">
        {filteredTasks.length === 0 ? (
          <div class="empty-state">
            <ClipboardList size={40} style={{ marginBottom: '0.75rem', color: 'var(--text-dim)' }} />
            <p>Không có bài tập nào cho ngày này hoặc danh mục "<strong>{activeCategory}</strong>".</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isExercise = task.category.toLowerCase() === 'exercise';
            const exInfo = isExercise ? getExerciseDetails(task.name) : null;
            const isSubstituted = task.isSubstituted;

            return (
              <article
                key={task.id}
                class={`task-card ${task.completed ? 'completed' : ''}`}
                style={{
                  gridTemplateColumns: '1fr auto',
                  borderColor: isSubstituted ? 'var(--accent-amber)' : undefined
                }}
              >
                <div class="task-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div class="task-title" style={{ fontSize: '1.1rem' }}>{task.name}</div>
                    {isSubstituted && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          background: 'rgba(245, 158, 11, 0.2)',
                          color: '#f59e0b',
                          border: '1px solid rgba(245, 158, 11, 0.4)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '6px',
                          fontWeight: 700
                        }}
                      >
                        🔄 Bài Thay Thế (Gốc: {task.originalName})
                      </span>
                    )}
                    {isExercise && exInfo && (
                      <button
                        class="btn"
                        style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem', borderColor: 'var(--primary-cyan)', color: 'var(--primary-cyan)' }}
                        onClick={() => onOpenExerciseDetail(task)}
                        title="Xem chi tiết nhóm cơ, minh họa & bài tập thay thế"
                      >
                        <Info size={12} /> Hướng dẫn & Đổi bài
                      </button>
                    )}
                  </div>

                  <div class="task-meta" style={{ marginTop: '0.35rem' }}>
                    <span class={`badge badge-cat-${task.category}`}>{task.category}</span>
                    <span class={`badge badge-prio-${task.priority}`}>{task.priority}</span>
                    {task.details && <span class="task-details">{task.details}</span>}
                    {isExercise && exInfo && (
                      <span style={{ fontSize: '0.75rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        🎯 Cơ chính: {exInfo.primaryMuscle.split(' (')[0]}
                      </span>
                    )}
                  </div>
                </div>

                <div class="task-checkbox-container">
                  <div class="custom-checkbox" onClick={() => onToggleTask(task.id)}>
                    <Check size={16} />
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
