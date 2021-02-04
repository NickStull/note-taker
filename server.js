const express = require("express");
const fs = require("fs");
const htmlRoutes = require("./routes/htmlroutes");
const apiRoutes = require("./routes/apiroutes");

const app = express();
const PORT = 8030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

htmlRoutes(app);
// apiRoutes(app);

app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    const dB = fs.readFileSync("./db/db.json");
    const dbData = JSON.parse(dB)

    dbData.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(dbData), (err) => err ? console.error(err) : console.log("Saved"));
    console.log(newNote);
    console.log(dbData);
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
