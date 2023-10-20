import { Dialog } from "./dialog.js";
import * as controller from "../../../app.js";

export class ArtistDeleteDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<button class="simple-btn"><i class="fas fa-times" data-action="close"></i></button>
      <h1>Delete artist?</h1>
      <p>Are you sure you want to delete the artist "<span id="delete-artist-name"></span>"?</p>
      <form action="" method="dialog" id="delete-form">
        <button class="cancel-button" type="button" data-action="cancel">Cancel</button>
        <button class="button" type="submit" data-action="delete">Delete</button>
      </form>`;

    return html;
  }

  setArtist(artist) {
    this.artist = artist;
    document.querySelector("#delete-artist-name").innerHTML = artist.artistName;
  }

  delete() {
    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.deleteArtist(this.artist);
  }
}
