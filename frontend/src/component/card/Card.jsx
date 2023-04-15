import './card.css'
import portfolio from '../../image/portfolio.jpg'
import user from '../../image/user.png'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
    <div className='card-container'>
      <Link to='video/test' style={{textDecoration: "none", color: "inherit"}}>
        <div className="card-wrapper">
          <img src={portfolio} alt="video" className='card-img' />
          <div className="card-content">
            <img src={user} alt="chanel" className="channel-img" />
            <div className="card-deails">
              <p className="card-title">React Portfolio Website</p>
              <p className="channel-name">Dhruv Kumar</p>
              <p className='card-video-details'> <span className="views"> 360k</span> <span className="date">1months ago</span></p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
