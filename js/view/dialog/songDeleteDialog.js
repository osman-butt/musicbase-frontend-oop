import { Dialog } from "./dialog.js";
import * as controller from "../../../app.js";

export class SongDeleteDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<h1>Delete song?</h1>
      <p>Are you sure you want to delete the song "<span id="deletesong-name"></span>"?</p>
      <form action="" method="dialog" id="delete-form">
        <button class="cancel-button" type="button" data-action="cancel">Cancel</button>
        <button class="button" type="submit" data-action="delete">Delete</button>
      </form>`;
    return html;
  }

  setSong(song) {
    this.song = song;
    document.querySelector("#deletesong-name").innerHTML = song.songName;
  }

  delete() {
    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.deleteSong(this.song);
  }
}
