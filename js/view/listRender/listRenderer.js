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

    // reset sortby to avoid toggling direction
    const sortBy = this.sortBy;
    this.sortBy = undefined;
    // and re-sort the new list from the existing settings
    if (!(this.items[0] instanceof ArtistRenderer)) {
      this.sort(sortBy, this.sortDir);
    }
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

  sort(sortBy, sortDir) {
    // if sorting by the same property as last time
    if (sortBy === this.sortBy) {
      // Toggle sort direction, ignore what sortDir is given
      this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
    } else {
      if (sortDir) {
        this.sortDir = sortDir;
      } else {
        this.sortDir = "asc";
      }
    }
    // store sortBy in property for next time
    this.sortBy = sortBy;

    // make direction into a number, to make it easier to flip
    const dir = this.sortDir === "asc" ? 1 : -1;

    // NOTE: sortFunctions MUST be arrow-functions, to keep the reference to this!
    const valueSortFunction = (a, b) =>
      a.item[this.sortBy] > b.item[this.sortBy] ? dir : -dir;
    const stringSortFunction = (a, b) =>
      a.item[this.sortBy]?.localeCompare(b.item[this.sortBy]) * dir;

    // select between sortFunctions, depending on the type on the sortBy property in the first item in the list
    const sortFunction =
      typeof this.items[0].item[this.sortBy] === "string"
        ? stringSortFunction
        : valueSortFunction;

    // sort the list with the chosen sortFunction
    this.items.sort(sortFunction);

    // and re-render the list
    this.render();
  }
}
