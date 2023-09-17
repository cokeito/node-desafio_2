const fs = require('node:fs');
const filename = 'songs.json';


const getSongs = () => {
  const songs = JSON.parse(fs.readFileSync(filename, 'utf8'));
  return songs;
}

const addSong = (args) => {
  const song = args

  console.log(args)
  const songs = JSON.parse(fs.readFileSync(filename))

  songs.push(song)
  if (fs.writeFileSync(filename, JSON.stringify(songs))) {
    return 'Canción agregada';
  } else {
    return 'Error al agregar canción';
  }

}

const editSong = (params, body) => {

  const { id } = params;
  const song = body;

  const songs = JSON.parse(fs.readFileSync(filename))
  const index = songs.findIndex(p => p.id == id)
  songs[index] = song
  fs.writeFileSync("songs.json", JSON.stringify(songs))
  return ("Canción editada con éxito")
}

const deleteSong = (params) => {
  const { id } = params
  const songs = JSON.parse(fs.readFileSync(filename))
  const index = songs.findIndex(s => s.id == id)
  songs.splice(index, 1)
  fs.writeFileSync(filename, JSON.stringify(songs))
  return ("Canción eliminada con éxito")
}

module.exports = { getSongs, addSong, editSong, deleteSong };