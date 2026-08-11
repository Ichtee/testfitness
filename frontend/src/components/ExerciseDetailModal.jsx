import React from 'react';
import { X, Dumbbell, Activity, CheckCircle2, ArrowRightLeft, Target, Video, ExternalLink, RotateCcw, AlertTriangle, PlayCircle } from 'lucide-react';
import { getExerciseDetails } from '../data/exerciseDatabase';

export default function ExerciseDetailModal({ isOpen, onClose, exercise, onSwapAlternative, onRevertOriginal }) {
  if (!isOpen || !exercise) return null;

  const info = getExerciseDetails(exercise.name);
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(info.videoSearch || `${info.name} form guide`)}`;
  const guideUrl = info.guideUrl || `https://www.muscleandstrength.com/exercises?search=${encodeURIComponent(info.name)}`;
  const embedId = info.youtubeEmbedId || 'eG9iU9wuUu4';

  const isSubstituted = exercise.isSubstituted;
  const originalName = exercise.originalName || exercise.name;

  return (
    <div class="modal-overlay active" style={{ zIndex: 120 }}>
      <div class="modal-container" style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Modal Header */}
        <div class="modal-header">
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Chi Tiết Bài Tập & Hướng Dẫn Kỹ Thuật
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {exercise.name}
            </h2>
          </div>
          <button class="btn" style={{ padding: '0.3rem 0.6rem' }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Substituted Alert & Revert Banner */}
        {isSubstituted && (
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '0.9rem 1.1rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <div>
                Đang dùng bài thay thế cho bài gốc: <strong style={{ color: '#ffffff' }}>"{originalName}"</strong>
              </div>
            </div>
            {onRevertOriginal && (
              <button
                class="btn btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#ffffff' }}
                onClick={() => {
                  onRevertOriginal(exercise.id);
                  onClose();
                }}
              >
                <RotateCcw size={14} /> Khôi Phục Bài Gốc
              </button>
            )}
          </div>
        )}

        {/* Embedded YouTube Video Player */}
        <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <div style={{ padding: '0.6rem 1rem', background: 'rgba(6, 182, 212, 0.1)', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <PlayCircle size={16} /> Video Minh Họa Trực Tiếp Kỹ Thuật Tập (Video Demo)
          </div>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
              src={`https://www.youtube.com/embed/${embedId}?autoplay=0&rel=0`}
              title={`Video demo ${info.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
            />
          </div>
        </div>

        {/* Muscle Anatomy Badges */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-emerald)', marginBottom: '0.6rem' }}>
            <Target size={18} /> Nhóm Cơ Tác Động Chi Tiết
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Cơ tác động chính:</span>
              <span class="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.4)', fontSize: '0.825rem' }}>
                🫀 {info.primaryMuscle}
              </span>
            </div>
            {info.secondaryMuscles && info.secondaryMuscles.length > 0 && (
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Cơ hỗ trợ liên quan:</span>
                {info.secondaryMuscles.map((sec, idx) => (
                  <span key={idx} class="badge" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', marginRight: '0.3rem', fontSize: '0.75rem' }}>
                    ⚡ {sec}
                  </span>
                ))}
              </div>
            )}
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Dụng cụ: <strong style={{ color: 'var(--text-main)' }}>{info.equipment}</strong>
            </div>
          </div>
        </div>

        {/* External Links */}
        <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary-cyan)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Video size={16} /> Nguồn Tham Khảo Bổ Sung (External Links)
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="btn"
              style={{ fontSize: '0.8rem', borderColor: '#ef4444', color: '#f87171', background: 'rgba(239, 68, 68, 0.1)' }}
            >
              <Video size={14} /> Search More Videos on YouTube
            </a>
            <a
              href={guideUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="btn"
              style={{ fontSize: '0.8rem', borderColor: 'var(--primary-cyan)', color: 'var(--primary-cyan)', background: 'rgba(6, 182, 212, 0.1)' }}
            >
              <ExternalLink size={14} /> Muscle & Strength Guide
            </a>
          </div>
        </div>

        {/* Execution Guide */}
        <div style={{ background: 'rgba(17, 24, 39, 0.6)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-cyan)', marginBottom: '0.75rem' }}>
            <Activity size={18} /> Minh Họa Cách Tập Chuẩn Form
          </div>
          <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
            {info.instructions.map((step, idx) => (
              <li key={idx} style={{ lineHeight: '1.5' }}>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Alternative Exercises */}
        <div style={{ background: 'rgba(139, 92, 246, 0.08)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
            <ArrowRightLeft size={18} /> Các Bài Tập Thay Thế (Cùng Nhóm Cơ)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {info.alternatives.map((alt, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>
                    🔄 {alt.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{alt.desc}</div>
                </div>
                {onSwapAlternative && (
                  <button
                    class="btn"
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', borderColor: 'var(--accent-purple)', color: '#c084fc' }}
                    onClick={() => {
                      onSwapAlternative(exercise.id, alt.name);
                      onClose();
                    }}
                  >
                    Thay bằng bài này
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div class="modal-actions" style={{ justifyContent: 'space-between' }}>
          {isSubstituted && onRevertOriginal ? (
            <button
              class="btn"
              style={{ borderColor: 'var(--accent-amber)', color: '#f59e0b' }}
              onClick={() => {
                onRevertOriginal(exercise.id);
                onClose();
              }}
            >
              <RotateCcw size={14} /> Khôi Phục Bài Gốc ({originalName})
            </button>
          ) : <div />}
          
          <button class="btn btn-primary" onClick={onClose}>
            <CheckCircle2 size={16} /> Đã Hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
