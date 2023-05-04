import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../component/card/Card'
import Menu from '../../component/menu/Menu'
import Navbar from '../../component/navbar/Navbar'
import './home.css'
import { useSelector } from 'react-redux'

const Home = () => {

  const { currentTheme } = useSelector(state=> state.theme)

  const [videos, setVideos]= useState([]);
  useEffect(()=>{
    const fetchData= async ()=> {
      const res= await axios.get('http://localhost:5000/api/videos/random')
      setVideos(res.data)
    }

    fetchData();
  }, [])

  return (
    <div className={currentTheme=== "light"? "light-container": "dark-container"} >
      <Menu />
      <div className="right-container">
        <Navbar />
        <div className="main">
          {videos.map(video=>(
            <Card video={video} key={video._id} type="video" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
