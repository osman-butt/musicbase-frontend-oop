import { Dialog } from "./dialog.js";
import * as controller from "../../../app.js";

export class SongUpdateDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<button class="simple-btn"><i class="fas fa-times" data-action="close"></i></button>
      <h1>Update song</h1>
      <form action="" method="dialog" id="update-form">
        <label for="update-songName">Name:</label> <input type="text" id="update-songName" name="songName" >
        <label for="update-songDuration">Duration:</label> <input type="text" id="update-songDescription" name="songDuration">
        <button class="button" data-action="update">Update</button>
      </form>`;

    return html;
  }

  setSong(song) {
    this.song = song;
    const form = this.dialog.querySelector("form");
    form.songName.value = song.songName;
    form.songDuration.value = song.songDuration;
  }

  update() {
    // Build animal-object from form - store in component for later use
    const form = this.dialog.querySelector("form");

    this.song.songName = form.songName.value;
    this.song.songDuration = form.songDuration.value;

    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.updateSong(this.song);
  }
}
