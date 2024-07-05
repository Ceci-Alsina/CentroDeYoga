import multer, { diskStorage } from 'multer';
import { join, extname } from 'path';

const storage = multer.memoryStorage()

// Crea una instancia de 'multer' con la configuración de almacenamiento definida.
export const upload = multer({ storage: storage }).single('imagen')


