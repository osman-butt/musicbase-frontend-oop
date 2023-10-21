import { Dialog } from "./dialog.js";
import { Song } from "../../model/song.js";
import * as controller from "../../../app.js";

export class SongCreateDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<button class="simple-btn"><i class="fas fa-times" data-action="close"></i></button>
      <h3>Create song</h3>
        <form action="" method="dialog" id="create-song-form">
          <label for="create-songName">Song name:</label>
          <input type="text" id="create-songName" name="songName" />
          <label for="create-albumDuration">Song Duration:</label>
          <input type="text" id="create-songDuration" name="songDuration" placeholder="ex. 00:03:04"/>
          <label for="create-song-artists">Select artists:</label>
          <select multiple name="createsongartists" id="create-song-artists"></select>
          <label for="create-song-feat-artists">Select Feat. artists:</label>
          <select multiple name="createsongfeatartists" id="create-song-feat-artists"></select>
          <button class="button" data-action="create">Create</button>
        </form>`;

    return html;
  }

  setArtistsDropdown(artists) {
    this.listOfArtists = artists;
    document.querySelector("#create-song-artists").innerHTML = "";
    document.querySelector("#create-song-feat-artists").innerHTML = "";
    for (const artist of artists) {
      const html = /*html*/ `
        <option value="${artist.artistId}">${artist.artistName}</option>
      `;
      document
        .querySelector("#create-song-artists")
        .insertAdjacentHTML("beforeend", html);
      document
        .querySelector("#create-song-feat-artists")
        .insertAdjacentHTML("beforeend", html);
    }
  }

  setAlbumsDropdown(albums) {
    document.querySelector("#create-song-albums").innerHTML = "";
    this.listOfAlbums = albums;
    for (const album of albums) {
      const html = /*html*/ `
        <option value="${album.albumId}">${album.albumName}</option>`;
      document
        .querySelector("#create-album-songs")
        .insertAdjacentHTML("beforeend", html);
    }
  }

  create() {
    // Build song-object from form
    const form = this.dialog.querySelector("form");
    this.song = new Song(null, form.songName.value, form.songDuration.value);

    // Add artist(s) to song object
    const artists = this.listOfArtists;
    const selectArtistElement = form.createsongartists;
    for (let i = 0; i < selectArtistElement.options.length; i++) {
      if (selectArtistElement.options[i].selected) {
        this.song.addArtist(
          artists.filter(
            artist =>
              artist.artistId === Number(selectArtistElement.options[i].value)
          )[0]
        );
      }
    }

    // Add feat artist(s) to song object
    const selectFeatArtistElement = form.createsongfeatartists;
    for (let i = 0; i < selectFeatArtistElement.options.length; i++) {
      if (selectFeatArtistElement.options[i].selected) {
        this.song.addArtist(
          artists.filter(
            artist =>
              artist.artistId ===
              Number(selectFeatArtistElement.options[i].value)
          )[0]
        );
      }
    }

    // clear form
    form.reset();

    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.createSong(this.song);
  }
}
