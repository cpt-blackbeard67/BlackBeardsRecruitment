import '../App.css'
import '../styling/home.css'
import { Navbar } from '../components/bar'
import { Head } from '../components/header'
import { Break } from '../components/handbreak'
import { Code } from '../components/code'
import { useEffect } from 'react';
function Home() {
    useEffect(() => {
  document.body.className = "home";
}, []);
    
  return (
    <>
    <div className='home-page'>
      <Navbar />
      <Head />

      <Break />

      <Code/>

      {/* <div className='h-1000 '>

      </div> */}
      </div>
    </>
  )
}

export default Home
