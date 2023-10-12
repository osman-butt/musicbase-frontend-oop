import { MusicController } from "./js/controller/musicController.js";

window.addEventListener("load", initApp);

async function initApp() {
  console.log("App.js is running 🎉");
  const controller = new MusicController();
  await controller.setDataLists();
  controller.renderViews();
}
