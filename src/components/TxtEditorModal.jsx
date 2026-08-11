import React, { useState, useEffect } from 'react';
import { FileEdit, X, Check } from 'lucide-react';

export default function TxtEditorModal({ isOpen, onClose, rawTxtContent, onSave }) {
  const [editorValue, setEditorValue] = useState(rawTxtContent || '');

  useEffect(() => {
    setEditorValue(rawTxtContent || '');
  }, [rawTxtContent]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(editorValue);
    onClose();
  };

  return (
    <div class="modal-overlay active">
      <div class="modal-container">
        <div class="modal-header">
          <h2>
            <FileEdit size={22} style={{ color: 'var(--primary-cyan)' }} /> Edit Schedule TXT File
          </h2>
          <button class="btn" style={{ padding: '0.3rem 0.6rem' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Format each line as: <code>[HH:MM] Task Name | Category | Priority | Details</code>
        </p>
        <textarea
          class="txt-editor"
          value={editorValue}
          onChange={(e) => setEditorValue(e.target.value)}
          placeholder="[07:00] Morning Walk | Cardio | High | 10 mins"
        />
        <div class="modal-actions">
          <button class="btn" onClick={onClose}>Cancel</button>
          <button class="btn btn-primary" onClick={handleSave}>
            <Check size={16} /> Apply & Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
