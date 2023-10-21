import { Dialog } from "./dialog.js";
import * as controller from "../../../app.js";
import { ListRenderer } from "../listRender/listRenderer.js";
import { dateConfig } from "../../utility/dateConfig.js";
import { AlbumSongRenderer } from "../listRender/albumSongsRenderer.js";

export class AlbumDetailsDialog extends Dialog {
  renderHTML() {
    const html = /*html*/ `
        <button class="simple-btn"><i class="fas fa-times" data-action="close"></i></button>
        <article id="details-album">
        <h1 id="details-albumName"></h1>
        <img id="details-albumImage" src="" alt="" style="width: 150px; border-radius: 50%; height:150px;" />
        <div id="details-albumReleaseDate"><p></p></div>
        <div id="album-songlist">
                      <table>
                <thead>
                  <tr>
                    <th>Song</th>
                    <td></td>
                    <td></td>
                    <th>Duration</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <!-- Song Rows go here -->
                </tbody>
              </table>
        </div>
        </article>
    `;

    return html;
  }

  setAlbum(album) {
    this.album = album;
    const element = this.dialog.querySelector("#details-album");
    element.querySelector("#details-albumName").innerHTML = album.albumName;
    element.querySelector("#details-albumImage").src = album.albumImage;
    element.querySelector("#details-albumReleaseDate p").innerHTML =
      album.albumReleaseDate.toLocaleString("da-DK", dateConfig);
    const albumSongs = new ListRenderer(
      this.album.songs,
      "#album-songlist tbody",
      AlbumSongRenderer
    );
    albumSongs.render();
  }

  removeSongFromAlbum(song) {
    this.album.removeSong(song);
  }
}
