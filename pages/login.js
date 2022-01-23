import React from 'react';
import {getProviders,signIn} from 'next-auth/react'
import Image from 'next/image';

export default function Login({providers,url}) {
  return <div className='flex flex-col items-center bg-black
  min-h-screen w-full justify-center
  '>
      <img src="https://i.imgur.com/fPuEa9V.png" className='w-32 mb-5'/>
      {/* <Image src="https://i.imgur.com/fPuEa9V.png" alt="me" width="100" height="100" /> */}

      {Object.values(providers).map((provider,index)=>(
          <div key={index}>
              <button className='bg-[#18D860] text-white p-2 rounded-full'
              
              onClick={()=>signIn(provider.id,{callbackUrl:"/"})}
              
              > Login with {provider.name}</button>
          </div>
      ))}
       
  </div>;
}

export async function getServerSideProps(){
    const providers=await getProviders();
    return {
        props:{
            providers,
            // url:"/spotify.png"
        }
    }
}
