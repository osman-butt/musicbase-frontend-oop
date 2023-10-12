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

  countSongs() {
    return this.songs.length;
  }
  artistsToString() {
    return this.artists.map(artist => artist.artistName);
  }
}
