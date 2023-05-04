import { useSelector } from 'react-redux'
import './search.css'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Menu from '../../component/menu/Menu';
import axios from 'axios';
import Card from '../../component/card/Card';
import Navbar from '../../component/navbar/Navbar';

const Search = () => {
  const { currentTheme }= useSelector(state=> state.theme);
  const location= useLocation();
  const query= location.state.query;
  const [videos, setVideos]= useState([]);
  useEffect(()=>{
    const fetchVideos= async ()=> {
        const res= await axios.get(`http://localhost:5000/api/videos/search?q=${query}`);
        setVideos(res.data)
    }
    fetchVideos();
  }, [query])

  return (
    <div className={currentTheme=== "light"? "light-container": "dark-container"} >
      <Menu />
      <div className="right-container">
        <Navbar />
        <div className="search-container">
          {videos.map(video=>(
            <Card video={video} key={video._id} type="video" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search
