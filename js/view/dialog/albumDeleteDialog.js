import { Dialog } from "./dialog.js";
import * as controller from "../../../app.js";

export class AlbumDeleteDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<button class="simple-btn"><i class="fas fa-times" data-action="close"></i></button>
      <h1>Delete artist?</h1>
      <p>Are you sure you want to delete the album "<span id="delete-album-name"></span>"?</p>
      <form action="" method="dialog" id="delete-form">
        <button class="cancel-button" type="button" data-action="cancel">Cancel</button>
        <button class="button" type="submit" data-action="delete">Delete</button>
      </form>`;

    return html;
  }

  setAlbum(album) {
    this.album = album;
    document.querySelector("#delete-album-name").innerHTML = album.albumName;
  }

  delete() {
    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.deleteAlbum(this.album);
  }
}
