const path = require('path');
const express = require('express');
const server = express();
const PORT = 8078;
const PATH = path.normalize(__dirname + '/..');
const http = require('http').Server(server);


server.use(express.static(path.join(PATH, 'dist')));

server.get('*', function (req, res) {
    res.sendFile(path.join(PATH, 'dist', 'index.html'));
});
module.exports = {
    start() {
        return new Promise((resolve, reject) => {
            http.listen(PORT, '0.0.0.0', (error) => {
                if (error)
                    reject(error);
                else {
                    resolve();
                }
            });
        });

    }
}