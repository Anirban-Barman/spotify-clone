import React from 'react';
import { useRecoilValue } from 'recoil';
import { playListAtom } from '../atoms/playlistAtom';
import Song from '../components/Song'

export default function Songs() {

    const paylist=useRecoilValue(playListAtom);
  return <div className="text-white px-8 flex flex-col space-y-1 pb-28">
      {paylist?.tracks.items.map((track, i) => <Song key={track.track.id} track={track} order={i}/>
     )}

  </div>;
}
