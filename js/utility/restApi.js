import { Artist } from "../model/artist.js";
import { Song } from "../model/song.js";
import { Album } from "../model/album.js";

// This class respresent data fetching
// and conversion to model classes
export class RestAPI {
  constructor() {
    this.endpoint = "http://localhost:3000/api/v2";
    this.artistList = [];
    this.songList = [];
    this.albumList = [];
  }
  // Get data
  async fetchSongs() {
    const resp = await fetch(`${this.endpoint}/songs`);
    const data = await resp.json();
    return data;
  }
  async fetchArtists() {
    const resp = await fetch(`${this.endpoint}/artists/`);
    const data = await resp.json();
    return data;
  }
  async fetchAlbums() {
    const resp = await fetch(`${this.endpoint}/albums`);
    const data = await resp.json();
    return data;
  }
  // Fetch and convert to model
  async #setArtistList() {
    const artists = await this.fetchArtists();
    const artistList = artists.map(
      artist =>
        new Artist(
          artist.artistID,
          artist.artistName,
          artist.artistImage,
          artist.artistDescription
        )
    );
    this.artistList = artistList;
  }
  async #setSongList() {
    const songs = await this.fetchSongs();
    const songList = [];
    for (const song of songs) {
      const primaryArtistIds = song.artists;
      const featArtistIds = song.featuredArtists;
      const artistIds = primaryArtistIds.concat(featArtistIds);
      const songObj = new Song(song.songID, song.songName, song.songDuration);
      for (const artistId of artistIds) {
        const artist = this.artistList.find(
          artistObj => artistObj.artistId === Number(artistId)
        );
        songObj.addArtist(artist);
      }
      songList.push(songObj);
    }
    this.songList = songList;
  }
  async #setAlbumList() {
    const albums = await this.fetchAlbums();
    const albumList = [];
    for (const album of albums) {
      const artistIds = album.artists;
      const songIds = album.songs;
      const albumObj = new Album(
        album.albumID,
        album.albumName,
        album.albumImage,
        album.albumReleaseDate
      );
      for (const artistId of artistIds) {
        const artist = this.artistList.find(
          artistObj => artistObj.artistId === Number(artistId)
        );
        albumObj.addArtist(artist);
      }
      for (const songId of songIds) {
        const song = this.songList.find(
          songObj => songObj.songId === Number(songId)
        );
        albumObj.addSong(song);
      }
      albumList.push(albumObj);
    }
    this.albumList = albumList;
  }
  async setDataLists() {
    await this.#setArtistList();
    await this.#setSongList();
    await this.#setAlbumList();
  }
}
