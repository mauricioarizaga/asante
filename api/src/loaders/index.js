const ExpressServer = require('./server/expressServer');
const mongooseLoader = require('./mongoose');
const config = require('../config');
const logger = require('./logger');

module.exports = async () => {
 
    await mongooseLoader();
    logger.info('DB loaded and connected');
    const server = new ExpressServer();
    logger.info('Express Loaded - API Reloaded ');

    server.start();
   
    logger.info(`#######################################
    El Server listening on port: ${config.port}
     #######################################
    `);
  
  }
