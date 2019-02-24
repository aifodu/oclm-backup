const {
    exec
} = require("child_process");

const EnsureAppClosed = function () {

    // Return a promise after execution then begin the process 

    exec(require.resolve("./dump.bat"), (error, stdout, stderr) => {
        if (error) {
            console.log("Error: ", error);
            return;
        }
        console.log(stdout);
    });
}

EnsureAppClosed();

module.exports = () => {
    EnsureAppClosed
}