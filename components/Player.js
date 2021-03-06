import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'
import {debounce} from 'lodash'
import {  SwitchHorizontalIcon,VolumeOffIcon,VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, VolumeUpIcon } from '@heroicons/react/solid';


export default function Player() {
    const spotifyApi = useSpotify()
    const { data: session } = useSession();
    const [currentTrackId,setCurrentTrackId]=useRecoilState(currentrackIdState);
    const [isPlaying,setIsPlaying]=useRecoilState(isPlayingState);
    const [volume,setVolume]=useState(50)
    const songInfo=useSongInfo();

    useEffect(() => {
        if(volume>0 && volume<100){
            debounceAdjustVolume(volume)
        }

    },[volume])
    const debounceAdjustVolume=useCallback(
        debounce((volume)=>{
            spotifyApi.setVolume(volume)
        }

        ,500),[]
    )

   const  handlePlayPause=()=>{

    spotifyApi.getMyCurrentPlaybackState().then((data)=>{
        if(data.body.is_playing){
            spotifyApi.pause();
            setIsPlaying(false);
        }
        else{
            spotifyApi.play();
            setIsPlaying(true);

        }

    })

    }



    const fetchCurrentSong=()=>{
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(track=>{
                console.log("track details",track)
                setCurrentTrackId(track?.body?.item?.id)
                spotifyApi.getMyCurrentPlaybackState().then(playbackState=>{
                    setIsPlaying(playbackState.body?.is_playing)
                })
            })
        }
    }

    useEffect(() => {
        if(spotifyApi.getAccessToken() && !currentTrackId){
            fetchCurrentSong();
            setVolume(50)
        }

    },[spotifyApi,session,currentrackIdState])

  return <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white
  grid grid-cols-3 text-xs md:text-base px-2 md:px-8
  ">
      <div className="flex items-center space-x-4">
          <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt={songInfo?.album.image}/>
          <div>
              <h3>{songInfo?.name}</h3>
              <p>{songInfo?.artists?.[0].name}</p>
          </div>
      </div>

      <div className="flex items-center justify-evenly">
       <SwitchHorizontalIcon className="button"/>
       <RewindIcon className="button"/>
       {isPlaying?(<PauseIcon onClick={handlePlayPause} className="button w-10 h-10"/>):<PlayIcon onClick={handlePlayPause}  className="button w-10 h-10"/>}

<FastForwardIcon className="button"/>
<ReplyIcon className="button"/>
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
          {volume===0?<VolumeOffIcon className="button"/>:<VolumeDownIcon onClick={()=>volume>0 && setVolume(volume-10)} className="button"/>}

<input value={volume} onChange={e=>setVolume(Number(e.target.value))} type="range" className="w-14 md:w-28" min={0} max={100} id="volume"/>
<VolumeUpIcon onClick={()=>volume<100 && setVolume(volume+10)} className="button"/>

      </div>
  </div>;
}
