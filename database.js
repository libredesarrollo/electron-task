const db = require('electron-db');
const { ipcMain, BrowserWindow } = require("electron");

ipcMain.on('item-save', (event, arg) => {
    if (arg.trim() != "")
        this.item_save(arg.trim())
})

ipcMain.on('item-delete', (event, arg) => {
    console.log(arg)
    this.item_delete(parseInt(arg))
})

module.exports.create_db = function () {
    db.createTable('items', (succ, msg) => {
        // succ - boolean, tells if the call is successful
        console.log("Success: " + succ);
        console.log("Message: " + msg);
    })
}

module.exports.item_save = function (name) {

    let obj = new Object()
    //obj.id = new Date().getTime()
    obj.name = name

    db.insertTableContent('items', obj, (succ, msg) => {
        console.log("Success: " + succ);
        console.log("Message: " + msg);
    })
}

module.exports.item_all = function () {
    db.getAll('items', (succ, data) => {
        //console.log(data)
        const win = BrowserWindow.getFocusedWindow()
        win.webContents.send('item-all',data)
    })
}

module.exports.item_get = function (id) {
    db.getRows('items',{id:id}, (succ, data) => {
        console.log(data[0].name)
    })
}

module.exports.item_update = function (id, name) {
    let where = {
        "id": id
    };

    let set = {
        "name": name
    }

    db.updateRow('items', where, set, (succ, msg) => {
        // succ - boolean, tells if the call is successful
        console.log("Success: " + succ);
        console.log("Message: " + msg);
    });
}

module.exports.item_delete = function (id) {
    db.deleteRow('items', { 'id': id }, (succ, msg) => {
        console.log(msg);
    });

}