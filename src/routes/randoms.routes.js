/* ============================ MODULOS ============================= */
import express from 'express';
import cluster from 'cluster';
import os from 'os';
import {logger} from '../utils/logger.config.js';

/* ====================== INSTANCIA DE ROUTER ======================= */
const randoms = express.Router();
const CPU_CORES = os.cpus().length;

/* ============================== RUTAS ============================= */
randoms.get('/randoms', (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    // if (cluster.isPrimary) {
    //     for (let i = 0; i < CPU_CORES; i++) {
    //         cluster.fork();
    //     }
    // } else {
    //     const qty = req.query.cant !== null && req.query.cant !== '' && req.query.cant !== undefined ? req.query.cant : 100000000 ;

    //     req.io.on('connection', async (socket) => {
    //         socket.emit('serv-rNumbs');

    //         const obj = {}
    //         for (let i=0; i<qty; i++) {
    //             const random = Math.floor(Math.random() *  1000)  + 1
    //             obj[random] = obj[random] ? obj[random]+1 : 1
    //         }
    //         return obj

    //             let rNumbs = [];
    //             for(let i=0; i !== qty; i++ ) { 
    //                 let newNumb = Math.floor(Math.random() * (1001) + 1);
    //                 const searchNumb = rNumbs.filter(num => num.number === newNumb);
            
    //                 if (searchNumb[0]){
    //                     let newRandomNumber = {number: searchNumb[0].number, quantity: searchNumb[0].quantity+1};
    //                     const randomNumbs = rNumbs.map(numb => numb.number === searchNumb[0].number ? newRandomNumber : numb);
    //                     rNumbs = randomNumbs;
    //                 } else {
    //                     let newRandomNumber = {number: newNumb, quantity: 1};
    //                     rNumbs.push(newRandomNumber);
    //                 }
    //             }
    //             rNumbs.sort((a,b) => a.number > b.number ? 1 : a.number < b.number ? -1 : 0);
    //             socket.emit('serv-rNumbs', rNumbs);
        // });

        res.render('partials/randoms', {layout: 'random', cant: qty});
    // }
});

randoms.get('*', async (request, response) => {
    logger.warn(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    response.status(404).send('404 - Page not found!!');
});

/* ====================== MODULOS EXPORTADOS ======================== */
export default randoms;