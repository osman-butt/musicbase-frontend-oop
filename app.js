import { RestAPI } from "./js/utility/restApi.js";
import { ListRenderer } from "./js/view/listRenderer.js";
import { ArtistRenderer } from "./js/view/artistRenderer.js";
import { ArtistUpdateDialog } from "./js/view/artistUpdateDialog.js";

window.addEventListener("load", initApp);

// Model
let artistList = [];
let songList = [];
let albumList = [];

// View
let updateDialog = null;

async function initApp() {
  console.log("App.js is running 🎉");
  await initViews();
}

// CONTROLLER FUNCTIONS
async function initViews() {
  await getData();
  // Create list component and render
  const artistsView = new ListRenderer(
    artistList,
    "#artists-container",
    ArtistRenderer
  );
  artistsView.render();

  // Create dialogs and render
  updateDialog = new ArtistUpdateDialog("update-dialog");
  updateDialog.render();
}

async function getData() {
  const api = new RestAPI();
  await api.getDataLists();
  artistList = api.artistList;
  songList = api.songList;
  albumList = api.albumList;
}

function selectArtistForUpdate(artist) {
  updateDialog.setArtist(artist);
  updateDialog.show();
}

async function updateArtist(artist) {
  await RestAPI.updateArtist(artist);
  await initViews();
}

export { selectArtistForUpdate, updateArtist };
