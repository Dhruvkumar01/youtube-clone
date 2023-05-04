import { useSelector } from 'react-redux'
import Menu from '../../component/menu/Menu'
import Navbar from '../../component/navbar/Navbar'
import './subscribedVideos.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../component/card/Card'
import { userRequest } from '../../requestMethod'

const SubscribedVideos = () => {
  const navigate= useNavigate();
  const { currentTheme }= useSelector(state=> state.theme);
  const [videos, setVideos]= useState([]);
  useEffect(()=>{
    try {
        
        const fetchVideos= async ()=> {
            const res= await userRequest.get(`videos/sub`);
            setVideos(res.data);
        }

        fetchVideos();

    } catch (err) {
        navigate('/error', {
            state: {
                name: "Getting Subscribed Videos",
                message: `${err.response.data.message}`
            }
        })
    }
  }, [navigate])
  return (
    <div className={currentTheme=== "light"? "light-container": "dark-container"} >
        <Menu />
        <div className="right-container">
            <Navbar />
            <h3 style={{margin: "10px 0", textAlign: "center"}}>Your Subscribed Videos</h3>
            <div className="subscribe-container">
                {
                    videos.map(video=> (
                        <Card key={video._id} video={video} type="video" />
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default SubscribedVideos
