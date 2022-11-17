/* ====================== MODULOS IMPORTADOS ======================== */
import httpServer from './src/server.js';
import minimist from "minimist";
import cluster from 'cluster';
import os from 'os';
import {logger} from './src/utils/logger.config.js';

/* ========================== INSTANCIANDO ========================== */
// const options = {alias: {serverMode: 's', modo: 'm', p: 'port', d: 'debug'}, default: {s: 'FORK', p: 8080, m: 'prod', debug: false}};
const options = {alias: {serverMode: 's', p: 'port'}, default: {s: 'FORK', p: 8080}};
const args =minimist(process.argv.slice(2), options);
const CPU_CORES = os.cpus().length;
const serverMode = args.serverMode.toUpperCase();

/* ============================ SERVIDOR ============================ */
if (serverMode === 'CLUSTER' ) {
    if (cluster.isPrimary) {
        logger.info(`Cantidad de cores: ${CPU_CORES}`);
        for (let i = 0; i < CPU_CORES; i++) {
            cluster.fork();
        }
        /* ------------------- Redundancia ------------------- */
        cluster.on('exit', worker => {
            logger.info(`Worker: ${worker.id}, whit PID: ${worker.process.pid}, has been finished at ${new Date().toLocaleString()}`);
            cluster.fork();
        });
    
    } else {
        const server = httpServer.listen(args.port, () => {
            logger.info(`PID worker: ${process.pid} - Server mode: ${serverMode}, listening at: http://localhost:${args.port}`);
        });
        server.on('error', err => { logger.error(`PID worker: ${process.pid} - Server error: ${err}`); });    
    }
} else {
    const server = httpServer.listen(args.port, () => {
        logger.info(`PID worker: ${process.pid} - Server mode: ${serverMode}, listening at: http://localhost:${args.port}`);
    });
    server.on('error', err => { logger.error(`Server error: ${err}`); });
}
