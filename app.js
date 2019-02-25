// const eventssetup = require('./eventssetup');
// if (eventssetup.handleSquirrelEvent()) {
//     return;
// }

const template = [{
        label: 'View',
        submenu: [{
                role: 'reload'
            },
            {
                role: 'toggledevtools'
            },
        ]
    },
    {
        role: 'window',
        submenu: [{
                role: 'minimize'
            },
            {
                role: 'close'
            }
        ]
    }
]

const electron = require('electron');
const {
    app,
    BrowserWindow,
    ipcMain,
    Menu
} = electron;
const url = require('url');
const path = require('path');

let win, error, slip, slips, size;

//remove for production
require('electron-reload')(__dirname);

app.on('ready', () => {
    size = electron.screen.getPrimaryDisplay().workAreaSize;
    createMainWindow();
    setupListeners();
});

function startError() {
    error = new BrowserWindow({
        width: 450,
        height: 230,
        frame: false,
        center: true,
        skipTaskbar: true,
        resizable: false,
        webPreferences: {
            devTools: false
        }
    });
    error.loadURL(url.format({
        pathname: path.join(__dirname, 'pages/error.html'),
        protocol: 'file:'
    }));
}

const PORT = 8078;

function createMainWindow() {
    win = new BrowserWindow({
        x: 0,
        y: 0,
        width: 650,
        height: size.height,
        show: false,
        icon: path.join(__dirname, 'assets/icons/png/favicon-32x32.png'),
        resizable: false,
        webPreferences: {
            devTools: false
        }
    });
    win.loadURL(url.format({
        pathname: `127.0.0.1:${PORT}`,
        protocol: 'http:',
        slashes: true
    }));
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

function setupListeners() {
    win.once('closed', () => {
        app.quit();
    });
    require('./config/server')
        .start()
        .then(() => {
            setTimeout(() => {
                win.show();
            }, 5000);
        })
        .catch(() => {
            startError();
            setTimeout(() => {
                error.close();
            }, 15000);
        });
}