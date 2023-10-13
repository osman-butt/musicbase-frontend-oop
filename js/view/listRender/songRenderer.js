import { ItemRenderer } from "./itemRenderer.js";
import * as controller from "../../../app.js";
export class SongRenderer extends ItemRenderer {
  render() {
    const song = this.item;
    const html = /*html*/ `
    <tr>
        <td> <span style="font-weight: 600;">${
          song.songName
        }</span> <br> <span style="opacity: 0.8;">${song.artists.map(
      artist => artist.artistName
    )}</span></td>
        <td></td>
        <td></td>
        <td>${song.durationToString()}</td>
        <td><button class="simple-btn"><i class="fas fa-trash" data-action="delete"></i></button></td>
                <td></td>
        <td><button class="simple-btn"><i class="fas fa-edit" data-action="update"></i></button></td>
                <td></td>
    </tr>`;
    return html;
  }
  postRender(element) {
    // Add eventListener to element
    element.addEventListener("click", event => {
      const action = event.target.dataset.action;
      const song = this.item;
      // Handle action - as defined in data-action="..."
      if (action === "update") {
        // ask controller to start update view
        controller.selectSongForUpdate(song);
      } else if (action === "delete") {
        controller.selectSongForDelete(song);
      }
    });
  }
}
