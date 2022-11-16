/* ---------------------------- MODULOS -----------------------------*/
import * as dotenv from 'dotenv';

dotenv.config();

/* ------------------- OBJETO CONFIGURADOR DE DB -------------------- */
const config = {
    env: process.env.NODE_ENV,
    secretKey: process.env.SECRET_KEY,
    dbType: process.env.DB_TYPE,
    mongoURL: process.env.MONGO_URL,
    fileSystemPath: process.env.FILESYSTEM_PATH,
};

export default config;