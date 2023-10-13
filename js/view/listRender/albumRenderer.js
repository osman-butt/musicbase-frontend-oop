import { ItemRenderer } from "./itemRenderer.js";
import { dateConfig } from "../../utility/dateConfig.js";
import * as controller from "../../../app.js";
export class AlbumRenderer extends ItemRenderer {
  render() {
    const album = this.item;
    const html = /*html*/ `
      <tr>
      <td><img src="${album.albumImage}" alt="" id="img-col"></td>
      <td><p style="font-weight: 600;" data-action='show'>${album.albumName}</p>
        <p style="opacity: 0.8;">${album.artistsToString()}</p></td>
      <td>${album.countSongs()}</td>
      <td>${album.albumReleaseDate.toLocaleString("da-DK", dateConfig)}</td>
      <td><button class="simple-btn"><i class="fas fa-trash"></i></button></td>
      <td><button class="simple-btn"><i class="fas fa-edit"></i></button></td>
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
