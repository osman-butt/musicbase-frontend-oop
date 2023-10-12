export class Song {
  constructor(songId, songName, songDuration) {
    // ID SHOULD NOT BE MODIFIED
    Object.defineProperty(this, "songId", {
      value: songId,
      writable: false,
      enumerable: true,
    });
    this.songName = songName;
    this.songDuration = this.#convertDuration(songDuration);
    this.artists = [];
  }
  #convertDuration(duration) {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    return hours * 60 * 60 + minutes * 60 + seconds;
  }
  durationToString() {
    const hours = Math.floor(this.songDuration / 3600);
    const minutes = Math.floor((this.songDuration % 3600) / 60);
    const remainingSeconds = this.songDuration % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  }
  addArtist(artist) {
    this.artists.push(artist);
    artist.addSong(this);
  }
}
