import { Dialog } from "./dialog.js";
import { dateConfig } from "../../utility/dateConfig.js";
import * as controller from "../../../app.js";

export class AlbumUpdateDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<button class="simple-btn"><i class="fas fa-times" data-action="close"></i></button>
      <h1>Update album</h1>
      <form action="" method="dialog" id="update-form">
        <label class="dialog-form-label" for="update-albumName">Name:</label> <input class="dialog-form-input" type="text" id="update-albumName" name="albumName">
        <label class="dialog-form-label" for="update-albumImage">Image:</label> <input class="dialog-form-input" type="text" id="update-albumImage" name="albumImage">
        <label class="dialog-form-label" for="update-albumReleaseDate">Releasedate:</label> <input class="dialog-form-input" type="text" id="update-albumReleaseDate" name="albumReleaseDate">
        <label class="dialog-form-label" for="update-album-artists">Select artists:</label>
        <select class="dialog-form-select" multiple name="updatealbumartists" id="update-album-artists"></select>
        <label class="dialog-form-label" for="update-album-songs">Select songs:</label>
        <select class="dialog-form-select" multiple name="updatealbumsongs" id="update-album-songs"></select>
        <button class="button" data-action="update">Update</button>
      </form>`;

    return html;
  }

  setAlbum(album) {
    this.album = album;

    const timezoneOffset = album.albumReleaseDate.getTimezoneOffset();
    const adjustedDate = new Date(
      album.albumReleaseDate.getTime() - timezoneOffset * 60 * 1000
    )
      .toISOString()
      .split("T")[0];

    const form = this.dialog.querySelector("form");
    form.albumName.value = album.albumName;
    form.albumImage.value = album.albumImage;
    form.albumReleaseDate.value = adjustedDate;
  }

  setArtistsDropdown(artists) {
    this.listOfArtists = artists;

    document.querySelector("#update-album-artists").innerHTML = "";

    for (const artist of artists) {
      if (this.album.artists.map(a => a.artistId).includes(artist.artistId)) {
        const html = /*html*/ `
        <option selected value="${artist.artistId}">${artist.artistName}</option>
      `;
        document
          .querySelector("#update-album-artists")
          .insertAdjacentHTML("beforeend", html);
      } else {
        const html = /*html*/ `
        <option value="${artist.artistId}">${artist.artistName}</option>
      `;
        document
          .querySelector("#update-album-artists")
          .insertAdjacentHTML("beforeend", html);
      }
    }
  }

  setSongsDropdown(songs) {
    this.listOfSongs = songs;
    document.querySelector("#update-album-songs").innerHTML = "";
    for (const song of songs) {
      if (this.album.songs.map(a => a.songId).includes(song.songId)) {
        const html = /*html*/ `
        <option selected value="${song.songId}">${
          song.songName
        } - BY: ${song.artists.map(a => a.artistName).toString()}</option>`;
        document
          .querySelector("#update-album-songs")
          .insertAdjacentHTML("beforeend", html);
      } else {
        const html = /*html*/ `
        <option value="${song.songId}">${song.songName} - BY: ${song.artists
          .map(a => a.artistName)
          .toString()}</option>`;
        document
          .querySelector("#update-album-songs")
          .insertAdjacentHTML("beforeend", html);
      }
    }
  }

  update() {
    // Build animal-object from form - store in component for later use
    const form = this.dialog.querySelector("form");

    this.album.albumName = form.albumName.value;
    this.album.albumImage = form.albumImage.value;
    this.album.albumReleaseDate = new Date(form.albumReleaseDate.value);

    // Add artist(s) to albums object
    const artists = this.listOfArtists;
    const selectArtistElement = form.updatealbumartists;
    this.album.artists = [];
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
    const selectSongElement = form.updatealbumsongs;
    this.album.songs = [];
    for (let i = 0; i < selectSongElement.options.length; i++) {
      if (selectSongElement.options[i].selected) {
        this.album.addSong(
          songs.filter(
            song => song.songId === Number(selectSongElement.options[i].value)
          )[0]
        );
      }
    }

    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.updateAlbum(this.album);
  }
}
