import { Link } from 'react-router-dom'
import './hrcard.css'

const Hrcard = ({video}) => {
  
  return (
    <div className='hrcard-container'>
      <Link to={`/videos/${video._id}`} style={{textDecoration: "none", color: "inherit"}}>
        <div className="hrcard-wrapper">
          <img src={video.img_url} alt="video"/>
          <div className="hrcard-content">
            <p className="hrcard-title">{video.name?.slice(0,45)}</p>
            <p className="hrchannel-name">Dhruv Kumar</p>
            <p className='hrcard-details'> {video.views} views &nbsp; {video.createdAt.slice(0, 10)}</p> 
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Hrcard
