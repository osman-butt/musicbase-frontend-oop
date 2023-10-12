import { Dialog } from "./dialog.js";
import { Artist } from "../model/artist.js";
import * as controller from "../../app.js";

export class ArtistUpdateDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<h1>Update artist</h1>
      <form action="" method="dialog" id="update-form">
        <label for="update-artistName">Name:</label> <input type="text" id="update-artistName" name="artistName" placeholder="The animal's name - e.g. John">
        <label for="update-artistImage">Image:</label> <input type="text" id="update-artistImage" name="artistImage" placeholder="The animal's type - e.g. dog">
        <label for="update-artistDescription">Description:</label> <input type="text" id="update-artistDescription" name="artistDescription">
        <button data-action="update">Update</button>
      </form>`;

    return html;
  }

  setArtist(artist) {
    this.artist = artist;
    const form = this.dialog.querySelector("form");
    form.artistName.value = artist.artistName;
    form.artistImage.value = artist.artistImage;
    form.artistDescription.value = artist.artistDescription;
  }

  update() {
    // Build animal-object from form - store in component for later use
    const form = this.dialog.querySelector("form");

    this.artist.artistName = form.artistName.value;
    this.artist.artistImage = form.artistImage.value;
    this.artist.artistDescription = form.artistDescription.value;

    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.updateArtist(this.artist);
  }
}
