import { Link } from 'react-router-dom'
import './hrcard.css'
import portfolio from '../../image/portfolio.jpg'

const Hrcard = () => {
  return (
    <div className='hrcard-container'>
      <Link to='/video/test3' style={{textDecoration: "none", color: "inherit"}}>
        <div className="hrcard-wrapper">
          <img src={portfolio} alt="video" className='hrcard-img' />
          <div className="hrcard-content">
            <p className="hrcard-title">React Portfolio Website with floating navbar </p>
            <p className="hrchannel-name">Dhruv Kumar</p>
            <p className='hrcard-details'> <span className="views"> 360k</span> <span className="date">1months ago</span></p> 
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Hrcard
