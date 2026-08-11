import React from 'react';
import { Zap, FileText, Upload, Download } from 'lucide-react';

export default function Header({ 
  timeStr, 
  dateStr, 
  onOpenEditor, 
  onImportClick, 
  onExportClick, 
  fileInputRef, 
  handleFileUpload 
}) {
  return (
    <header>
      <div class="header-brand">
        <div class="brand-icon">
          <Zap size={24} />
        </div>
        <div class="brand-text">
          <h1>FitPulse MVC</h1>
          <p>Fullstack React & Node.js MVC Daily Checklist</p>
        </div>
      </div>

      <div class="header-clock-box">
        <div class="live-badge">
          <span class="pulse-dot"></span> LIVE
        </div>
        <div class="clock-display">{timeStr}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{dateStr}</div>
      </div>

      <div class="header-actions">
        <button class="btn" onClick={onOpenEditor} title="Edit Raw .txt File">
          <FileText size={16} /> Edit TXT
        </button>
        <button class="btn" onClick={onImportClick} title="Import TXT File">
          <Upload size={16} /> Import TXT
        </button>
        <button class="btn btn-primary" onClick={onExportClick} title="Export TXT File">
          <Download size={16} /> Export TXT
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          accept=".txt" 
          style={{ display: 'none' }} 
          onChange={handleFileUpload} 
        />
      </div>
    </header>
  );
}
