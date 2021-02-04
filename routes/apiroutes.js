const path = require("path");
const fs = require("fs");

module.exports = function (app) {
    // getNotes API
    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    // saveNote API
    app.post("/api/notes", function(req, res) {
        const newNote = req.body;
        const dB = fs.readFileSync(path.join(__dirname, "../db/db.json"));
        const dbData = JSON.parse(dB)

        // console.log(dbData.slice(-1)[0])
        newNote.id = (dbData.length > 0) ? dbData.slice(-1)[0].id + 1 : 1
        dbData.push(newNote);
        res.json(newNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dbData), (err) => err ? console.error(err) : console.log("Saved"));
    });

    // deleteNote API
    app.delete("/api/notes/:id", function (req, res) {
        const noteID = req.params.id
        const dB = fs.readFileSync(path.join(__dirname, "../db/db.json"));
        const dbData = JSON.parse(dB)
        
        for (let i = 0; i < dbData.length; i++) {
            if (noteID == dbData[i].id) {
                dbData.splice(i, 1);
                res.json(dbData);
                fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dbData), (err) => err ? console.error(err) : console.log("Saved"));
            }
        }
    });
};