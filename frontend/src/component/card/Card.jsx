import './card.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import { format } from 'timeago.js'

const Card = ({ video, type}) => {
  const [channel, setChannel]= useState({})
  useEffect(()=>{
    const fetchChannel= async ()=>{
      const res= await axios.get(`http://localhost:5000/api/users/find/${video.userId}`)
      setChannel(res.data);
    }
    fetchChannel()
  }, [video.userId])

  return (
    <div className={type==="video"? 'card-container' : 'card-container-trend'}>
      <Link to={`/videos/${video._id}`} style={{textDecoration: "none", color: "inherit"}}>
        <div className={type==="video"? "card-wrapper" : "card-wrapper-trend"}>
          <div className="card-img-container">
            <img src={video.img_url} alt={"video "} className='card-img' />
          </div>
          <div className={type==="video"? "card-content" : "card-content-trend"} >
            <img src={channel.img} alt="chanel" className="channel-img" />
            <div className="card-details">
              <p className="card-title">{video.name}</p>
              <p>{channel.name}</p>
              { type==="trend" && <p className='card-desc'>{video.desc}</p>}
              <p className='card-video-details'> <span className="views"> {video.views} Views</span> <span className="date">{"2 days ago"}</span></p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
