import { useSelector } from 'react-redux'
import './trending.css'
import Menu from '../../component/menu/Menu'
import Navbar from '../../component/navbar/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../component/card/Card'

const Trending = () => {
  const { currentTheme }= useSelector(state=> state.theme);
  const [videos, setVideos]= useState([]);
  useEffect(()=>{
    const fetchVideos= async ()=> {
        const res= await axios.get('http://localhost:5000/api/videos/trend');
        setVideos(res.data);
    }
    fetchVideos();
  }, [])
  return (
    <div className={currentTheme=== "light"? "light-container": "dark-container"} >
      <Menu />
      <div className="right-container">
        <Navbar />
        <div className="trending-container">
            {
                videos.map(video=> (
                    <Card key={video._id} video={video} type="trend" />
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Trending
