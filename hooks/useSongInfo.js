import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentrackIdState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify'

export default function useSongInfo() {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentrackIdState);
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
       
     
            if(currentTrackId){
           const trackInfo=await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`,
           {
               headers: {
                   Authorization: 'Bearer ' + spotifyApi.getAccessToken()
               }
           }).then(response => response.json())
           console.log("track info",trackInfo)
           setSongInfo(trackInfo)


            }

        }
        fetchSongInfo();


    }, [
        currentTrackId, spotifyApi
    ])

    return songInfo;
}
