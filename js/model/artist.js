export class Artist {
  constructor(artistId, artistName, artistImage, artistDescription) {
    // ID should not be modified.
    Object.defineProperty(this, "artistId", {
      value: artistId,
      writable: false,
      enumerable: true,
    });

    this.artistName = artistName;
    this.artistImage = artistImage;
    this.artistDescription = artistDescription;
    this.songs = [];
    this.albums = [];
  }
  // Methods
  addSong(song) {
    this.songs.push(song);
  }
  addAlbum(album) {
    this.albums.push(album);
  }
}
