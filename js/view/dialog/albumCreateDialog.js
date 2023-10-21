import { Dialog } from "./dialog.js";
import { Album } from "../../model/album.js";
import * as controller from "../../../app.js";

export class AlbumCreateDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<button class="simple-btn"><i class="fas fa-times" data-action="close"></i></button>
      <h3>Create album</h3>
        <form action="" method="dialog" id="create-album-form">
          <label for="create-albumName">Album name:</label>
          <input type="text" id="create-albumName" name="albumName" />
          <label for="create-albumImage">Image url:</label>
          <input type="text" id="create-albumImage" name="albumImage" />
          <label for="create-albumReleaseDate">Releasedate :</label>
          <input
            type="text"
            id="create-albumReleaseDate"
            name="albumReleaseDate"
            placeholder="YYYY-MM-DD"
          />
          <label for="create-album-artists">Select artists:</label>
          <select multiple name="createalbumartists" id="create-album-artists"></select>
          <label for="create-album-songs">Select songs:</label>
          <select multiple name="createalbumsongs" id="create-album-songs"></select>
          <button class="button" data-action="create">Create</button>
        </form>`;

    return html;
  }

  setArtistsDropdown(artists) {
    this.listOfArtists = artists;
    document.querySelector("#create-album-artists").innerHTML = "";

    for (const artist of artists) {
      const html = /*html*/ `
        <option value="${artist.artistId}">${artist.artistName}</option>
      `;
      document
        .querySelector("#create-album-artists")
        .insertAdjacentHTML("beforeend", html);
    }
  }

  setSongsDropdown(songs) {
    this.listOfSongs = songs;
    document.querySelector("#create-album-songs").innerHTML = "";

    for (const song of songs) {
      const html = /*html*/ `
        <option value="${song.songId}">${song.songName} - BY: ${song.artists
        .map(a => a.artistName)
        .toString()}</option>`;
      document
        .querySelector("#create-album-songs")
        .insertAdjacentHTML("beforeend", html);
    }
  }

  create() {
    // Build animal-object from form - store in component for later use
    const form = this.dialog.querySelector("form");
    this.album = new Album(
      null,
      form.albumName.value,
      form.albumImage.value.includes("https://")
        ? form.albumImage.value
        : "https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg",
      form.albumReleaseDate.value
    );

    // Add artist(s) to albums object
    const artists = this.listOfArtists;
    const selectArtistElement = form.createalbumartists;

    for (let i = 0; i < selectArtistElement.options.length; i++) {
      if (selectArtistElement.options[i].selected) {
        this.album.addArtist(
          artists.filter(
            artist =>
              artist.artistId === Number(selectArtistElement.options[i].value)
          )[0]
        );
      }
    }

    // Add song(s) to albums object
    const songs = this.listOfSongs;
    const selectSongElement = form.createalbumsongs;

    for (let i = 0; i < selectSongElement.options.length; i++) {
      if (selectSongElement.options[i].selected) {
        this.album.addSong(
          songs.filter(
            song => song.songId === Number(selectSongElement.options[i].value)
          )[0]
        );
      }
    }

    // clear form
    form.reset();

    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.createAlbum(this.album);
  }
}
