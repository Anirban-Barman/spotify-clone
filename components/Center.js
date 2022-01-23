import { ChevronDownIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { shuffle } from "lodash"
import { useRecoilState, useRecoilValue } from 'recoil';
import { playListAtom, playListIdAtom } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from '../components/Songs'
const colors = [
    "form-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500"
]

export default function Center() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify()
    const [color, setColor] = useState(null)
    const playListId = useRecoilValue(playListIdAtom);
    const [playlist, setPlaylist] = useRecoilState(playListAtom);
    useEffect(() => {
        setColor(shuffle(colors).pop())

    }, [playListId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playListId).then((data) => {
            setPlaylist(data.body);
        }).catch((err) => {
            console.log("something went wrong", err)
        })

    }, [spotifyApi, playListId])

    return <div
        className='flex-grow h-screen overflow-y-scroll scrollbar-hide '
    >

        <header className='absolute top-5 right-8'>
            <div onClick={()=>signOut()} className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer p-1 pr-2 rounded-full'>
                <img className='rounded-full w-10 h-10' src={session?.user.image} alt="avatar" />
                <h2>{session?.user.name}</h2>
                <ChevronDownIcon className='h-5 w-5' />
            </div>
        </header>
        <section className={`flex w-full items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
            <img src={playlist?.images?.[0].url} className="h-44 w-44 shadow-2xl" alt="" />

            <div>
                <p>PLAYLIST</p>
                <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h2>
            </div>

        </section>
        <div>
            <Songs/>
        </div>



    </div>;
}