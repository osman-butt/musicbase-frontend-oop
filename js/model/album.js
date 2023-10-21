export class Album {
  constructor(albumId, albumName, albumImage, albumReleaseDate) {
    // ID SHOULD NOT BE MODIFIED
    Object.defineProperty(this, "albumId", {
      value: albumId,
      writable: false,
      enumerable: true,
    });
    this.albumName = albumName;
    this.albumImage = albumImage;
    this.albumReleaseDate = new Date(albumReleaseDate);
    this.artists = [];
    this.songs = [];
  }
  // Methods
  addArtist(artist) {
    this.artists.push(artist);
    // artist.addAlbum(this);
  }

  addSong(song) {
    this.songs.push(song);
  }

  removeSong(song) {
    const updatedSongs = this.songs.filter(s => s.songId !== song.songId);
    this.songs = updatedSongs;
  }

  countSongs() {
    return this.songs.length;
  }
  artistsToString() {
    return this.artists.map(artist => artist.artistName);
  }
}
