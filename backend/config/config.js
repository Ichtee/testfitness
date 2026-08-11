import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PORT = process.env.PORT || 5000;
export const TXT_FILE_PATH = path.join(__dirname, '..', 'data', 'New Text Document.txt');
