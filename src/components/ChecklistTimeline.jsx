import React from 'react';
import { Calendar, Check, ClipboardList } from 'lucide-react';

const CATEGORIES = ['All', 'Exercise', 'Nutrition', 'Hydration', 'Recovery', 'Sleep'];

export default function ChecklistTimeline({ 
  tasks, 
  activeCategory, 
  onSelectCategory, 
  activeTaskId, 
  onToggleTask 
}) {
  const filteredTasks = tasks.filter((t) => {
    if (activeCategory === 'All') return true;
    return t.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section>
      <div class="section-header" style={{ marginBottom: '1.25rem' }}>
        <div class="section-title">
          <Calendar size={22} style={{ color: 'var(--primary-cyan)', marginRight: '0.5rem' }} /> Today's Schedule
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

      <div class="checklist-grid">
        {filteredTasks.length === 0 ? (
          <div class="empty-state">
            <ClipboardList size={40} style={{ marginBottom: '0.75rem', color: 'var(--text-dim)' }} />
            <p>No fitness tasks found for category "<strong>{activeCategory}</strong>".</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isActive = task.id === activeTaskId;
            return (
              <article
                key={task.id}
                class={`task-card ${task.completed ? 'completed' : ''} ${isActive ? 'active-now' : ''}`}
              >
                <div class="task-time-box">
                  <div class="task-time">{task.time}</div>
                  {isActive && <div class="active-tag">ACTIVE NOW</div>}
                </div>

                <div class="task-content">
                  <div class="task-title">{task.name}</div>
                  <div class="task-meta">
                    <span class={`badge badge-cat-${task.category}`}>{task.category}</span>
                    <span class={`badge badge-prio-${task.priority}`}>{task.priority}</span>
                    {task.details && <span class="task-details">{task.details}</span>}
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
