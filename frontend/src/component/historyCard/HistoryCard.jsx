import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './historyCard.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoMdShareAlt } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { HiDownload } from 'react-icons/hi'

const HistoryCard = ({history}) => {
  const [video, setVideo]= useState({});
  const [showOption, setShowOption]= useState(false)

  useEffect(()=>{
    const fetchVideo= async ()=> {
      const res= await axios.get(`http://localhost:5000/api/videos/find/${history.videoId}`);
      setVideo(res.data);
    }
    fetchVideo();

  }, [history])

  const handleDelete= async ()=>{
    const res= await axios.delete(`http://localhost:5000/api/historys/${history.historyId}`);
    setShowOption(false);
    res.status=== 200 && alert("hietory of video deleted succesfully");
    console.log("delete is clicked");
  }

  return (
    <div className='historyCard-container'>
      {video && 
        <>
          <Link to={`/videos/${video._id}`} style={{textDecoration: "none", color: "inherit"}} className='historyCard-link' >
            <div className="historyCard-wrapper">
              <img src={video.img_url} alt="video" className='historyCard-img' />
              <div className="historyCard-content">
                <h3>{video.name}</h3>
                <p>Dhruv Kumar &nbsp; &middot; &nbsp; {video.views} views </p>
                <p className='history-card-desc' >{video.desc}</p>
                {<p className='historyCard-details'>   {video.createdAt?.slice(0, 10)}</p> } 
              </div>
            </div>
          </Link>
          <BsThreeDotsVertical className='historyCard-option-button' onClick={()=> setShowOption(!showOption)} />
          {showOption &&
            <div className="historyCard-options-container">
              <div className="historyCard-option">
                <MdDelete />
                <p onClick={handleDelete}>Delete from history</p>
              </div>
              <div className="historyCard-option">
                <HiDownload />
                <p>Download</p>
              </div>
              <div className="historyCard-option">
                <IoMdShareAlt />
                <p>Share</p>
              </div>
            </div>
          }
        </>
      }
    </div>
  )
}

export default HistoryCard
