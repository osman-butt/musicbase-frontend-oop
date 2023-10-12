import { RestAPI } from "./js/utility/restApi.js";

window.addEventListener("load", initApp);

async function initApp() {
  console.log("App.js is running 🎉");
  const api = new RestAPI();
  await api.setDataLists();
  console.log(api.artistList);
  console.log(api.songList);
  console.log(api.albumList);
}
