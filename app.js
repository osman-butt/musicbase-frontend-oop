import { RestAPI } from "./js/utility/restApi.js";
import { ListRenderer } from "./js/view/listRenderer.js";
import { ArtistRenderer } from "./js/view/dialog/artistRenderer.js";
import { ArtistUpdateDialog } from "./js/view/dialog/artistUpdateDialog.js";
import { ArtistDetailsDialog } from "./js/view/dialog/artistDetailsDialog.js";
import { ArtistDeleteDialog } from "./js/view/dialog/artistDeleteDialog.js";

window.addEventListener("load", initApp);

// Model
let artistList = [];
let songList = [];
let albumList = [];

// View
let updateDialog = null;
let detailDialog = null;
let deleteDialog = null;

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
}

function renderDialogs() {
  // Create dialogs and render
  updateDialog = new ArtistUpdateDialog("update-dialog");
  updateDialog.render();
  detailDialog = new ArtistDetailsDialog("details-dialog");
  detailDialog.render();
  deleteDialog = new ArtistDeleteDialog("delete-dialog");
  deleteDialog.render();
}

async function getData() {
  const api = new RestAPI();
  await api.getDataLists();
  artistList = api.artistList;
  songList = api.songList;
  albumList = api.albumList;
}

function selectArtistForUpdate(artist) {
  detailDialog.close();
  updateDialog.setArtist(artist);
  updateDialog.show();
}

function selectArtistForDetails(artist) {
  detailDialog.setArtist(artist);
  detailDialog.show();
}

function selectArtistForDelete(artist) {
  detailDialog.close();
  deleteDialog.setArtist(artist);
  deleteDialog.show();
}

async function updateArtist(artist) {
  await RestAPI.updateArtist(artist);
  renderLists();
}

async function deleteArtist(artist) {
  await RestAPI.deleteArtist(artist);
  renderLists();
}

export {
  selectArtistForUpdate,
  updateArtist,
  deleteArtist,
  selectArtistForDetails,
  selectArtistForDelete,
};
