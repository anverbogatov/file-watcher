const fs = require('fs');
const EventEmitter = require('events');

const emitter = new EventEmitter();

const fileWatchers = [];

emitter.on('start_monitoring', (monitoredDir) => {
    const watcher = fs.watch(monitoredDir, (event, fileName) => {
        console.log(`Event of ${event} type was published for ${fileName}`);
    });
    fileWatchers.push(watcher);
});

emitter.on('stop_monitoring', () => {
    for (const watcher of fileWatchers) {
        watcher.close();
    }
});

/**
 EXPORTS SECTION
 */

exports.startMonitoring = (monitoredDir) => {
    emitter.emit('start_monitoring', monitoredDir);
}

exports.stopMonitoring = () => {
    emitter.emit('stop_monitoring');
};