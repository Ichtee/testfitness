import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const TXT_FILE_PATH = path.join(__dirname, 'New Text Document.txt');

app.use(cors());
app.use(express.json());

// GET /api/schedule - Read New Text Document.txt
app.get('/api/schedule', (req, res) => {
  try {
    if (fs.existsSync(TXT_FILE_PATH)) {
      const content = fs.readFileSync(TXT_FILE_PATH, 'utf-8');
      res.json({ success: true, content });
    } else {
      res.status(404).json({ success: false, error: 'File not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/schedule - Write to New Text Document.txt
app.post('/api/schedule', (req, res) => {
  try {
    const { content } = req.body;
    if (typeof content !== 'string') {
      return res.status(400).json({ success: false, error: 'Invalid content format' });
    }
    fs.writeFileSync(TXT_FILE_PATH, content, 'utf-8');
    res.json({ success: true, message: 'Schedule updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ FitPulse Express Node.js Server running at http://localhost:${PORT}`);
});
