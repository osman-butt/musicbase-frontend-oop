import { AlbumRenderer } from "./albumRenderer.js";
import { ArtistRenderer } from "./artistRenderer.js";
import { SongRenderer } from "./songRenderer.js";

export class ListRenderer {
  constructor(list, container, itemRenderer) {
    this.itemRenderer = itemRenderer;
    this.container = document.querySelector(container);
    this.setList(list);
  }

  setList(list) {
    // Build list of renderers with items in them
    this.items = list.map(item => new this.itemRenderer(item));
  }

  clear() {
    this.container.innerHTML = "";
  }

  render() {
    this.clear();
    // const items = this.items;
    const items = this.search();
    for (const itemRenderer of items) {
      const html = itemRenderer.render();
      this.container.insertAdjacentHTML("beforeend", html);
      if (itemRenderer.postRender) {
        const element = this.container.lastElementChild;
        itemRenderer.postRender(element);
      }
    }
  }

  setSearch(searchValue) {
    this.searchValue = searchValue;
    this.render();
  }

  search() {
    if (this.searchValue === "" || this.searchValue === undefined)
      return this.items;
    if (this.items[0] instanceof AlbumRenderer) {
      const list = this.items.filter(render => {
        return (
          render.item.albumName === this.searchValue ||
          render.item.artists.some(
            artist => artist.artistName === this.searchValue
          ) ||
          render.item.songs.some(song => song.songName === this.searchValue)
        );
      });
      return list;
    } else if (this.items[0] instanceof SongRenderer) {
      const list = this.items.filter(render => {
        return (
          render.item.songName === this.searchValue ||
          render.item.artists.some(
            artist => artist.artistName === this.searchValue
          ) ||
          render.item.albums.some(album => album.albumName === this.searchValue)
        );
      });
      return list;
    } else if (this.items[0] instanceof ArtistRenderer) {
      const list = this.items.filter(render => {
        return (
          render.item.artistName === this.searchValue ||
          render.item.albums.some(
            album => album.albumName === this.searchValue
          ) ||
          render.item.songs.some(song => song.songName === this.searchValue)
        );
      });
      return list;
    } else {
      console.log("Unknown data");
      return this.items;
    }
  }
}
