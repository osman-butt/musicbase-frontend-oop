import { RestAPI } from "./js/utility/restApi.js";
import { ListRenderer } from "./js/view/listRender/listRenderer.js";
import { ArtistRenderer } from "./js/view/listRender/artistRenderer.js";
import { SongRenderer } from "./js/view/listRender/songRenderer.js";
import { AlbumRenderer } from "./js/view/listRender/albumRenderer.js";
import { ArtistCreateDialog } from "./js/view/dialog/artistCreateDialog.js";
import { ArtistUpdateDialog } from "./js/view/dialog/artistUpdateDialog.js";
import { ArtistDetailsDialog } from "./js/view/dialog/artistDetailsDialog.js";
import { ArtistDeleteDialog } from "./js/view/dialog/artistDeleteDialog.js";
import { SongCreateDialog } from "./js/view/dialog/songCreateDialog.js";
import { SongUpdateDialog } from "./js/view/dialog/songUpdateDialog.js";
import { SongDeleteDialog } from "./js/view/dialog/songDeleteDialog.js";
import { AlbumDetailsDialog } from "./js/view/dialog/albumDetailsDialog.js";
import { AlbumCreateDialog } from "./js/view/dialog/albumCreateDialog.js";
import { AlbumUpdateDialog } from "./js/view/dialog/albumUpdateDialog.js";
import { AlbumDeleteDialog } from "./js/view/dialog/albumDeleteDialog.js";

window.addEventListener("load", initApp);

// Model
let artistList = [];
let songList = [];
let albumList = [];

// View
// let artistsView = null;
// let songsView = null;
// let albumsView = null;
let createArtistDialog = null;
let updateArtistDialog = null;
let detailArtistDialog = null;
let deleteArtistDialog = null;
let createSongDialog = null;
let updateSongDialog = null;
let deleteSongDialog = null;
let detailAlbumDialog = null;
let createAlbumDialog = null;
let updateAlbumDialog = null;
let deleteAlbumDialog = null;

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
  // console.log(artistList);
  // console.log(songList);
  // console.log(albumList);
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

  const albumsView = new ListRenderer(
    albumList,
    "#albums-container tbody",
    AlbumRenderer
  );
  albumsView.render();
  document.querySelector("#search-form").addEventListener("submit", async e => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.search.value;
    albumsView.setSearch(searchValue);
    songsView.setSearch(searchValue);
    artistsView.setSearch(searchValue);
  });

  // initialize sort buttons
  document
    .querySelector("#albums-container")
    .querySelectorAll("[data-action='sort']")
    .forEach(button =>
      button.addEventListener("click", () => {
        // before sorting - remove .selected from previous selected header
        document
          .querySelector("[data-action=sort].selected")
          ?.classList.remove("selected");

        albumsView.sort(button.dataset.sortBy, button.dataset.sortDirection);

        // indicate selected sort header
        button.classList.add("selected");
        // indicate sort-direction on button
        button.dataset.sortDirection = albumsView.sortDir;
      })
    );
  document
    .querySelector("#songs-container")
    .querySelectorAll("[data-action='sort']")
    .forEach(button =>
      button.addEventListener("click", () => {
        // before sorting - remove .selected from previous selected header
        document
          .querySelector("[data-action=sort].selected")
          ?.classList.remove("selected");

        songsView.sort(button.dataset.sortBy, button.dataset.sortDirection);

        // indicate selected sort header
        button.classList.add("selected");
        // indicate sort-direction on button
        button.dataset.sortDirection = songsView.sortDir;
      })
    );
}

function renderDialogs() {
  // Create dialogs and render
  createArtistDialog = new ArtistCreateDialog("create-artist-dialog");
  createArtistDialog.render();

  document
    .querySelector("#createArtistDialog")
    .addEventListener(
      "click",
      createArtistDialog.show.bind(createArtistDialog)
    );

  updateArtistDialog = new ArtistUpdateDialog("update-artist-dialog");
  updateArtistDialog.render();

  detailArtistDialog = new ArtistDetailsDialog("details-artist-dialog");
  detailArtistDialog.render();

  deleteArtistDialog = new ArtistDeleteDialog("delete-artist-dialog");
  deleteArtistDialog.render();

  createSongDialog = new SongCreateDialog("create-song-dialog");
  createSongDialog.render();

  document.querySelector("#createSongDialog").addEventListener("click", () => {
    createSongDialog.setArtistsDropdown(artistList);
    createSongDialog.show.bind(createSongDialog);
    createSongDialog.show();
  });

  updateSongDialog = new SongUpdateDialog("update-song-dialog");
  updateSongDialog.render();

  deleteSongDialog = new SongDeleteDialog("delete-song-dialog");
  deleteSongDialog.render();

  detailAlbumDialog = new AlbumDetailsDialog("details-artist-dialog");
  detailAlbumDialog.render();

  createAlbumDialog = new AlbumCreateDialog("create-album-dialog");
  createAlbumDialog.render();

  document.querySelector("#createAlbumDialog").addEventListener("click", () => {
    createAlbumDialog.setArtistsDropdown(artistList);
    createAlbumDialog.setSongsDropdown(songList);
    createAlbumDialog.show.bind(createAlbumDialog);
    createAlbumDialog.show();
  });

  updateAlbumDialog = new AlbumUpdateDialog("update-album-dialog");
  updateAlbumDialog.render();

  deleteAlbumDialog = new AlbumDeleteDialog("delete-album-dialog");
  deleteAlbumDialog.render();
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

function selectAlbumForDetails(album) {
  detailAlbumDialog.setAlbum(album);
  detailAlbumDialog.show();
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

function selectAlbumForUpdate(album) {
  updateAlbumDialog.setAlbum(album);
  updateAlbumDialog.setArtistsDropdown(artistList);
  updateAlbumDialog.setSongsDropdown(songList);
  updateAlbumDialog.show();
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

function selectAlbumForDelete(album) {
  deleteAlbumDialog.setAlbum(album);
  deleteAlbumDialog.show();
}

// CREATE OPERATIONS
// --- CREATE OPERATIONS GOES HERE ---
async function createArtist(artist) {
  await RestAPI.createArtist(artist);
  renderLists();
}

async function createAlbum(album) {
  await RestAPI.createAlbum(album);
  console.log(album);
  renderLists();
}

async function createSong(song) {
  await RestAPI.createSong(song);
  console.log(song);
  renderLists();
}

// UPDATE OPERATIONS
async function updateArtist(artist) {
  await RestAPI.updateArtist(artist);
  renderLists();
}

async function updateSong(song) {
  await RestAPI.updateSong(song);
  renderLists();
}

async function updateAlbum(album) {
  await RestAPI.updateAlbum(album);
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

async function deleteAlbum(album) {
  await RestAPI.deleteAlbum(album);
  renderLists();
}

async function selectSongToRemoveFromAlbum(song) {
  detailAlbumDialog.removeSongFromAlbum(song);
  await RestAPI.updateAlbum(detailAlbumDialog.album);
  detailAlbumDialog.render();
  detailAlbumDialog.setAlbum(detailAlbumDialog.album);
  renderLists();
}

export {
  selectArtistForDetails,
  selectAlbumForDetails,
  selectArtistForUpdate,
  selectArtistForDelete,
  createArtist,
  updateArtist,
  deleteArtist,
  selectSongForUpdate,
  selectSongForDelete,
  createSong,
  updateSong,
  deleteSong,
  selectAlbumForUpdate,
  selectAlbumForDelete,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  selectSongToRemoveFromAlbum,
};
