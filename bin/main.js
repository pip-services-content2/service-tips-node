let TipsProcess = require('../obj/src/container/TipsProcess').TipsProcess;

try {
    new TipsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
