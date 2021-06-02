const process = require('process');
const fileUtils = require('./files/utils');

const monitoredDir = process.argv[2];
console.log(`Starting monitoring for directory = ${monitoredDir}`);

// on start
fileUtils.startMonitoring(monitoredDir);
// on exit
process.on('beforeExit', fileUtils.stopMonitoring);
process.on('SIGINT', fileUtils.stopMonitoring);