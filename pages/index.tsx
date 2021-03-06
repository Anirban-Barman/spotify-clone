import Head from 'next/head'
import Sidebar from '../components/Sidebar';
import Center from '../components/Center'
import { getSession } from 'next-auth/react';
import Player from '../components/Player'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
      <link rel="shortcut icon" href="https://i.imgur.com/fPuEa9V.png" />
      </Head>
    

      
      <main className='flex'>
       
        <Sidebar/>
        <Center/>
      </main>
      <div className='sticky bottom-0'>
       <Player/>
      </div>
    </div>
  )
}

export async function getServerSideProps(context:any){
  const session =await getSession(context);
  return {
    props: {session}
  }

}
