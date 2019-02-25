const {
    exec
} = require("child_process");

const EnsureAppClosed = function () {
    return new Promise((resolve, reject) => {
        exec(require.resolve("./oclm.bat"), (error, stdout, stderr) => {
            resolve();
        });
    });
}

EnsureAppClosed();

module.exports = {
    EnsureAppClosed
}