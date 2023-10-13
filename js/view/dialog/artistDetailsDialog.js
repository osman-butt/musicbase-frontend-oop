import { Dialog } from "./dialog.js";
import * as controller from "../../../app.js";

export class ArtistDetailsDialog extends Dialog {
  renderHTML() {
    const html = /*html*/ `
        <button class="simple-btn"><i class="fas fa-times" data-action="close"></i></button>
        <article id="details">
        <h1 id="details-artistName"></h1>
        <img id="details-artistImage" src="" alt="" style="width: 150px; border-radius: 50%; height:150px;" />
        <div id="details-artistDescription"><p></p></div>
        <div>
                <button class="simple-btn"><i class="fas fa-trash" data-action="delete"></i></button>
        <button class="simple-btn"><i class="fas fa-edit" data-action="update"></i></button>
        </div>
        </article>
    `;

    return html;
  }

  setArtist(artist) {
    this.artist = artist;
    const element = this.dialog.querySelector("#details");
    element.querySelector("#details-artistName").innerHTML = artist.artistName;
    element.querySelector("#details-artistImage").src = artist.artistImage;
    element.querySelector("#details-artistDescription p").innerHTML =
      artist.artistDescription;
  }

  update() {
    controller.selectArtistForUpdate(this.artist);
  }

  delete() {
    controller.selectArtistForDelete(this.artist);
  }
}
