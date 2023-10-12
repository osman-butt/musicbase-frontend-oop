import { ItemRenderer } from "./itemRenderer.js";
export class ArtistRenderer extends ItemRenderer {
  render() {
    const artist = this.item;
    const html = /*html*/ `
    <article class="artist-item">
        <img src=${artist?.artistImage ? artist?.artistImage : ""} alt="">
        <p>${artist.artistName}</p>
    </article>`;
    return html;
  }
  postRender(element) {
    element.addEventListener("click", () => {
      const event = new Event("showArtist");
      event.artist = this.item;
      document.dispatchEvent(event);
    });
  }
}
