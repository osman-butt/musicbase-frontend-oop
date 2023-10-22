import { ItemRenderer } from "./itemRenderer.js";
import * as controller from "../../../app.js";
export class ArtistRenderer extends ItemRenderer {
  render() {
    const artist = this.item;
    const html = /*html*/ `
    <article class="artist-item" data-action=''>
        <img src=${
          artist?.artistImage ? artist?.artistImage : ""
        } alt="" data-action='show'>
        <p style="font-weight: 500;" data-action='show'>${artist.artistName}</p>
    </article>`;
    return html;
  }
  postRender(element) {
    // Add eventListener to element
    element.addEventListener("click", event => {
      const action = event.target.dataset.action;
      const artist = this.item;
      // Handle action - as defined in data-action="..."
      if (action === "update") {
        // ask controller to start update view
        controller.selectArtistForUpdate(artist);
      } else if (action === "show") {
        controller.selectArtistForDetails(artist);
      }
    });
  }
}
