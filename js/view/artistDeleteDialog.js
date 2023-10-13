import Dialog from "./dialog.js";
import * as controller from "../../app.js";

export default class ArtistDeleteDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<h1>Delete artist?</h1>
      <p>Are you sure you want to delete the artist "${this.artist.artistName}"?</p>
      <form action="" method="dialog" id="delete-form">
        <button type="button" data-action="cancel">Cancel</button>
        <button type="submit" data-action="delete">Delete</button>
      </form>`;

    return html;
  }

  setArtist(artist) {
    this.artist = artist;
  }

  delete() {
    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.deleteArtist(this.artist);
  }
}
