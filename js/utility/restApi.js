import { Artist } from "../model/artist.js";
import { Song } from "../model/song.js";
import { Album } from "../model/album.js";

// This class respresent data fetching
// and conversion to model classes
export class RestAPI {
  constructor() {
    this.artistList = [];
    this.songList = [];
    this.albumList = [];
  }
  static endpoint = "https://musicbase-app.azurewebsites.net/api/v2";
  // Get data
  async fetchSongs() {
    const resp = await fetch(`${RestAPI.endpoint}/songs`);
    const data = await resp.json();
    return data;
  }
  async fetchArtists() {
    const resp = await fetch(`${RestAPI.endpoint}/artists/`);
    const data = await resp.json();
    return data;
  }
  async fetchAlbums() {
    const resp = await fetch(`${RestAPI.endpoint}/albums`);
    const data = await resp.json();
    return data;
  }
  static async #createArtistFetch(body) {
    const json = JSON.stringify(body);
    const response = await fetch(`${RestAPI.endpoint}/artists`, {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("CREATED ARTIST");
    }
  }
  static async #updateArtistFetch(id, body) {
    const json = JSON.stringify(body);
    const response = await fetch(`${RestAPI.endpoint}/artists/${id}`, {
      method: "PUT",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("UPDATED ARTIST");
    }
  }
  static async #deleteArtistFetch(id) {
    const response = await fetch(`${RestAPI.endpoint}/artists/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("DELETED ARTIST");
    }
  }
  static async #createSongFetch(body) {
    const json = JSON.stringify(body);
    const response = await fetch(`${RestAPI.endpoint}/songs`, {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("CREATED SONG");
    }
  }
  static async #updateSongFetch(id, body) {
    const json = JSON.stringify(body);
    const response = await fetch(`${RestAPI.endpoint}/songs/${id}`, {
      method: "PUT",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("UPDATED SONG");
    }
  }
  static async #deleteSongFetch(id) {
    const response = await fetch(`${RestAPI.endpoint}/songs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("DELETED SONG");
    }
  }
  static async #createAlbumFetch(body) {
    const json = JSON.stringify(body);
    const response = await fetch(`${RestAPI.endpoint}/albums`, {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("CREATED ALBUM");
    }
  }
  static async #updateAlbumFetch(id, body) {
    const json = JSON.stringify(body);
    const response = await fetch(`${RestAPI.endpoint}/albums/${id}`, {
      method: "PUT",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("UPDATED ALBUM");
    }
  }
  static async #deleteAlbumFetch(id) {
    const response = await fetch(`${RestAPI.endpoint}/albums/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("DELETED ALBUM");
    }
  }
  // Fetch and convert to model
  async #getArtistList() {
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
  async #getSongList() {
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
  async #getAlbumList() {
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
  async getDataLists() {
    await this.#getArtistList();
    await this.#getSongList();
    await this.#getAlbumList();
  }
  static async createArtist(artist) {
    const body = {
      artistName: artist.artistName,
      artistImage: artist.artistImage,
      artistDescription: artist.artistDescription,
    };
    await RestAPI.#createArtistFetch(body);
  }
  static async updateArtist(artist) {
    const id = artist.artistId;
    const body = {
      artistName: artist.artistName,
      artistImage: artist.artistImage,
      artistDescription: artist.artistDescription,
    };
    await RestAPI.#updateArtistFetch(id, body);
  }
  static async deleteArtist(artist) {
    const id = artist.artistId;
    await RestAPI.#deleteArtistFetch(id);
  }
  static async createSong(song) {
    const body = {
      songName: song.songName,
      songDuration: song.durationToString(),
      artists: song.artists.map(artist => artist.artistId),
    };
    await RestAPI.#createSongFetch(body);
  }
  static async updateSong(song) {
    const id = song.songId;
    const body = {
      songName: song.songName,
      songDuration: song.durationToString(),
    };
    await RestAPI.#updateSongFetch(id, body);
  }
  static async deleteSong(song) {
    const id = song.songId;
    await RestAPI.#deleteSongFetch(id);
  }
  static async createAlbum(album) {
    const body = {
      albumName: album.albumName,
      albumImage: album.albumImage,
      albumReleaseDate: album.albumReleaseDate.toISOString().split("T")[0],
      artists: album.artists.map(artist => artist.artistId),
      songs: album.songs.map(song => song.songId),
    };
    await RestAPI.#createAlbumFetch(body);
  }
  static async updateAlbum(album) {
    const id = album.albumId;
    const timezoneOffset = album.albumReleaseDate.getTimezoneOffset();
    const adjustedDate = new Date(
      album.albumReleaseDate.getTime() - timezoneOffset * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    const body = {
      albumName: album.albumName,
      albumImage: album.albumImage,
      albumReleaseDate:
        album.albumReleaseDate instanceof Date
          ? adjustedDate
          : album.albumReleaseDate,
      artists: album.artists.map(a => a.artistId),
      songs: album.songs.map(s => s.songId),
    };
    await RestAPI.#updateAlbumFetch(id, body);
  }
  static async deleteAlbum(album) {
    const id = album.albumId;
    await RestAPI.#deleteAlbumFetch(id);
  }
}
