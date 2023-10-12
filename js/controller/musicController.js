import { RestAPI } from "../utility/restApi.js";
import { ListRenderer } from "../view/listRenderer.js";
import { ArtistRenderer } from "../view/artistRenderer.js";

export class MusicController {
  constructor() {
    this.listRenderer = ListRenderer;
    this.artistList = [];
    this.songList = [];
    this.albumList = [];
  }
  async setDataLists() {
    const api = new RestAPI();
    await api.setDataLists();
    this.artistList = api.artistList;
    this.songList = api.songList;
    this.albumList = api.albumList;
  }
  renderViews() {
    const artistsView = new ListRenderer(
      this.artistList,
      "#artists-container",
      ArtistRenderer
    );
    artistsView.render();
  }
}
