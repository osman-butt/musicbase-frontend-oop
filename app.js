import { RestAPI } from "./js/utility/restApi.js";
import { ListRenderer } from "./js/view/listRender/listRenderer.js";
import { ArtistRenderer } from "./js/view/listRender/artistRenderer.js";
import { SongRenderer } from "./js/view/listRender/songRenderer.js";
import { ArtistUpdateDialog } from "./js/view/dialog/artistUpdateDialog.js";
import { ArtistDetailsDialog } from "./js/view/dialog/artistDetailsDialog.js";
import { ArtistDeleteDialog } from "./js/view/dialog/artistDeleteDialog.js";
import { SongUpdateDialog } from "./js/view/dialog/songUpdateDialog.js";
import { SongDeleteDialog } from "./js/view/dialog/songDeleteDialog.js";

window.addEventListener("load", initApp);

// Model
let artistList = [];
let songList = [];
let albumList = [];

// View
let updateArtistDialog = null;
let detailArtistDialog = null;
let deleteArtistDialog = null;
let updateSongDialog = null;
let deleteSongDialog = null;

async function initApp() {
  console.log("App.js is running 🎉");
  await initViews();
}

// CONTROLLER FUNCTIONS
async function initViews() {
  renderLists();
  renderDialogs();
}

async function renderLists() {
  await getData();
  // Create list component and render
  const artistsView = new ListRenderer(
    artistList,
    "#artists-container",
    ArtistRenderer
  );
  artistsView.render();

  const songsView = new ListRenderer(
    songList,
    "#songs-container tbody",
    SongRenderer
  );
  songsView.render();
}

function renderDialogs() {
  // Create dialogs and render
  updateArtistDialog = new ArtistUpdateDialog("update-artist-dialog");
  updateArtistDialog.render();
  detailArtistDialog = new ArtistDetailsDialog("details-artist-dialog");
  detailArtistDialog.render();
  deleteArtistDialog = new ArtistDeleteDialog("delete-artist-dialog");
  deleteArtistDialog.render();

  updateSongDialog = new SongUpdateDialog("update-song-dialog");
  updateSongDialog.render();

  deleteSongDialog = new SongDeleteDialog("delete-song-dialog");
  deleteSongDialog.render();
}

async function getData() {
  const api = new RestAPI();
  await api.getDataLists();
  artistList = api.artistList;
  songList = api.songList;
  albumList = api.albumList;
}

// CREATE Dialogs
// --- CREATE DIALOGS GOES HERE ---

// Read Dialogs
function selectArtistForDetails(artist) {
  detailArtistDialog.setArtist(artist);
  detailArtistDialog.show();
}

// Update Dialogs
function selectArtistForUpdate(artist) {
  detailArtistDialog.close();
  updateArtistDialog.setArtist(artist);
  updateArtistDialog.show();
}

function selectSongForUpdate(song) {
  updateSongDialog.setSong(song);
  updateSongDialog.show();
}

// Delete Dialogs
function selectArtistForDelete(artist) {
  detailArtistDialog.close();
  deleteArtistDialog.setArtist(artist);
  deleteArtistDialog.show();
}

function selectSongForDelete(song) {
  deleteSongDialog.setSong(song);
  deleteSongDialog.show();
}

// CREATE OPERATIONS
// --- CREATE OPERATIONS GOES HERE ---

// UPDATE OPERATIONS
async function updateArtist(artist) {
  await RestAPI.updateArtist(artist);
  renderLists();
}

async function updateSong(song) {
  await RestAPI.updateSong(song);
  renderLists();
}

// DELETE OPERATIONS
async function deleteArtist(artist) {
  await RestAPI.deleteArtist(artist);
  renderLists();
}

async function deleteSong(song) {
  await RestAPI.deleteSong(song);
  renderLists();
}

export {
  selectArtistForDetails,
  selectArtistForUpdate,
  selectArtistForDelete,
  updateArtist,
  deleteArtist,
  selectSongForUpdate,
  selectSongForDelete,
  updateSong,
  deleteSong,
};
