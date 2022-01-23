import React, { useEffect, useState } from 'react';
import {signOut, useSession} from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import {playListIdAtom} from '../atoms/playlistAtom'
import {HeartIcon} from '@heroicons/react/solid';


import { HomeIcon, LibraryIcon, PlusIcon, RssIcon, SearchIcon } from '@heroicons/react/outline'
import { useRecoilState } from 'recoil';


export default function Sidebar() {
    const spotifyApi=useSpotify()
    const [playLists,setPlayLists]=useState([])
    const [playListId,setPlayListId]=useRecoilState(playListIdAtom)
    const {data:session,status}=useSession();
   
useEffect(()=>{
    if(spotifyApi.getAccessToken()){
        spotifyApi.getUserPlaylists().then((data)=>{
            setPlayLists(data.body.items)
            console.log(playLists)
        })
    }
},[session,spotifyApi]);

    return <div className='text-gray-500 p-9  text-xs lg:text-sm border-r
     border-gray-900 scrollbar-hide overflow-y-scroll
      h-screen sm:max-w[12rem] lg:max-w[16rem] hidden md:inline-flex pb-36
     ' >
        <div className='space-y-4'>
       
            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className='h-5 w-5' />
                <p>Home</p>
            </button>


            <button className='flex items-center space-x-2 hover:text-white'>
                <SearchIcon className='h-5 w-5' />
                <p>Search</p>
            </button>



            <button className='flex items-center space-x-2 hover:text-white'>
                <LibraryIcon className='h-5 w-5' />

                <p>Your Library</p>
            </button>

            <hr className='border-t-[0.1px] border-gray-900' />

            <button className='flex items-center space-x-2 hover:text-white'>
                <PlusIcon className='h-5 w-5' />
                <p>Create Playlist</p>
            </button>
            <button className='flex items-center space-x-2 text-blue-500 hover:text-white'>
                <HeartIcon className='h-5 w-5' />

                <p>Liked Songs</p>
            </button>

            <button className='flex items-center space-x-2 hover:text-white'>
                <RssIcon className='h-5 w-5 text-green-500' />
                <p>Your episodes</p>
            </button>




            <hr className='border-t-[0.1px] border-gray-900' />

             {playLists?.map((playList)=>{
           return  <p key={playList.id} onClick={()=>setPlayListId(playList.id)} className='cursor-pointer hover:text-white'>{playList.name}</p>


             })}
     



        </div>


    </div>;
}
