import { Dialog } from "./dialog.js";
import { Artist } from "../../model/artist.js";
import * as controller from "../../../app.js";

export class ArtistCreateDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<button class="simple-btn"><i class="fas fa-times" data-action="close"></i></button>
      <h3>Create artist</h3>
        <form action="" method="dialog" id="create-artist-form">
          <label for="create-artistName">Name:</label>
          <input type="text" id="create-artistName" name="artistName" />
          <label for="create-artistImage">Image url:</label>
          <input type="text" id="create-artistImage" name="artistImage" />
          <label for="create-artistDescription">Description :</label>
          <input
            type="text"
            id="create-artistDescription"
            name="artistDescription"
          />
          <button class="button" data-action="create">Create</button>
        </form>`;

    return html;
  }

  create() {
    // Build animal-object from form - store in component for later use
    const form = this.dialog.querySelector("form");
    this.artist = new Artist(
      null,
      form.artistName.value,
      form.artistImage.value.includes("https://")
        ? form.artistImage.value
        : "https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg",
      form.artistDescription.value
    );

    // clear form
    form.reset();

    // call controller - NOTE: In a 'true' MVC the controller would register an event listener on the view, and get notified that way.
    controller.createArtist(this.artist);
  }
}
