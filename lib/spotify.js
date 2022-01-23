import SpotifyWebApi from "spotify-web-api-node";
import { URLSearchParams } from "url";

const scopes=[
    'user-read-email',
    'playlist-modify-private',
    'playlist-read-collaborative',
    'playlist-read-private',
    'playlist-modify-public',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-private',
    'user-follow-modify',
    'user-follow-read',
    'user-read-playback-position',
    'user-top-read',
    'user-read-recently-played'

].join(',');

const params={
    scope:scopes
}

const queryparamString= new URLSearchParams(params)
const LOGIN_URL="https://accounts.spotify.com/authorize?"+queryparamString.toString();
const spotifyApi= new SpotifyWebApi({
    clientId:process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret:process.env.NEXT_PUBLIC_CLIENT_SECRET

})
export default spotifyApi;
export {LOGIN_URL}

