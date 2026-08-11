import fs from 'fs';
import { TXT_FILE_PATH } from '../config/config.js';

class ScheduleModel {
  /**
   * Reads raw schedule string from New Text Document.txt
   */
  static getSchedule() {
    if (!fs.existsSync(TXT_FILE_PATH)) {
      throw new Error('Data file New Text Document.txt does not exist.');
    }
    return fs.readFileSync(TXT_FILE_PATH, 'utf-8');
  }

  /**
   * Writes raw schedule string into New Text Document.txt
   */
  static saveSchedule(content) {
    if (typeof content !== 'string') {
      throw new Error('Content must be a string.');
    }
    fs.writeFileSync(TXT_FILE_PATH, content, 'utf-8');
    return true;
  }
}

export default ScheduleModel;
