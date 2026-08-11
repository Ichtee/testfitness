import express from 'express';
import cors from 'cors';
import { PORT } from './config/config.js';
import scheduleRoutes from './routes/scheduleRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes middleware
app.use('/api', scheduleRoutes);

app.listen(PORT, () => {
  console.log(`⚡ MVC Backend Server running on http://localhost:${PORT}`);
});
