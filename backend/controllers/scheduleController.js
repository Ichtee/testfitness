import ScheduleModel from '../models/ScheduleModel.js';

export const getSchedule = (req, res) => {
  try {
    const content = ScheduleModel.getSchedule();
    return res.status(200).json({ success: true, content });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const updateSchedule = (req, res) => {
  try {
    const { content } = req.body;
    if (content === undefined) {
      return res.status(400).json({ success: false, error: 'Missing content body parameter' });
    }
    ScheduleModel.saveSchedule(content);
    return res.status(200).json({ success: true, message: 'Schedule updated successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
