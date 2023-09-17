const fs = require('node:fs');
const express = require('express')
const { getSongs, addSong, editSong, deleteSong } = require('./actions.js');
const cors = require('cors')
const app = express()

app.listen(3000, console.log("¡Servidor encendido!"))
app.use(cors());
app.use(express.json())


// create songs if doesn't exist
if (!fs.existsSync('songs.json')) {
  fs.writeFileSync('songs.json', '[]');
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get("/canciones", (req, res) => {
  const songs = getSongs();
  res.json(songs)
})

app.post("/canciones", (req, res) => {
  console.log('add song');
  const addNewSong = addSong(req.body)
  res.send(addNewSong);
})

app.put("/canciones/:id", (req, res) => {
  console.log("edit song");
  const editTheSong = editSong(req.params, req.body)
  res.send(editTheSong);
})

app.delete("/canciones/:id", (req, res) => {
  console.log("delete song");
  const deleteTheSong = deleteSong(req.params)
  res.send(deleteTheSong);
})
