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
          <select multiple name="createalbumartists" id="create-album-artists">
          </select>
          <button class="button" data-action="create">Create</button>
        </form>`;

    return html;
  }

  setArtistsDropdown(artists) {
    this.listOfArtists = artists;
    for (const artist of artists) {
      const html = /*html*/ `
        <option value="${artist.artistId}">${artist.artistName}</option>
      `;
      document
        .querySelector("#create-album-artists")
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
    const selectElement = form.createalbumartists;

    for (let i = 0; i < selectElement.options.length; i++) {
      if (selectElement.options[i].selected) {
        this.album.addArtist(
          artists.filter(
            artist => artist.artistId === Number(selectElement.options[i].value)
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
