import { Dialog } from "./dialog.js";
import { dateConfigForm } from "../../utility/dateConfig.js";
import * as controller from "../../../app.js";

export class AlbumUpdateDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<h1>Update album</h1>
      <form action="" method="dialog" id="update-form">
        <label for="update-albumName">Name:</label> <input type="text" id="update-albumName" name="albumName">
        <label for="update-albumImage">Image:</label> <input type="text" id="update-albumImage" name="albumImage">
        <label for="update-albumReleaseDate">Releasedate:</label> <input type="text" id="update-albumReleaseDate" name="albumReleaseDate">
        <button class="button" data-action="update">Update</button>
      </form>`;

    return html;
  }

  setAlbum(album) {
    this.album = album;
    const form = this.dialog.querySelector("form");
    form.albumName.value = album.albumName;
    form.albumImage.value = album.albumImage;
    form.albumReleaseDate.value = album.albumReleaseDate
      .toISOString()
      .split("T")[0];
  }

  update() {
    // Build animal-object from form - store in component for later use
    const form = this.dialog.querySelector("form");

    this.album.albumName = form.albumName.value;
    this.album.albumImage = form.albumImage.value;
    this.album.albumReleaseDate = new Date(form.albumReleaseDate.value)
      .toISOString()
      .split("T")[0];

    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.updateAlbum(this.album);
  }
}
