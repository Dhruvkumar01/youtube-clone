import './menu.css'
import youtube from '../../image/youtube.jpg'
import { MdHelpOutline, MdHome, MdOutlineExplore, MdOutlineHistory, MdOutlineLightMode, MdOutlineLiveTv, MdOutlineMovie, MdOutlineSportsBasketball, MdOutlineSubscriptions, MdOutlineVideoLibrary } from 'react-icons/md'
import { BsFileEarmarkMusic } from 'react-icons/bs'
import { RiGamepadLine } from 'react-icons/ri'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { CiSettings } from 'react-icons/ci'
import { TbReport } from 'react-icons/tb'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="menu-wrapper">
        <Link to='/' style={{textDecoration: "none", color: "inherit"}}>
          <div className="logo">
            <img src={youtube} alt="youtube-logo" />
            <p>YouTube</p>
          </div>
        </Link>
        <ul className="menu-item-container">
          <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
            <li className='menu-item'>
              <MdHome />
              <span>Home</span>
            </li>
          </Link>
          <li className='menu-item'>
            <MdOutlineExplore />
            <span>Explore</span>
          </li>
          <li className='menu-item'>
            <MdOutlineSubscriptions />
            <span>Subscription</span>
          </li>
          <hr className='hr'/>

          <li className='menu-item'>
            <MdOutlineVideoLibrary />
            <span>Library</span>
          </li>
          <li className='menu-item'>
            <MdOutlineHistory />
            <span>History</span>
          </li>

          <hr className='hr'/>

          <div className="menu-login">
            <p>Signin To Like Videos, Share and Subcribe</p>
            <button className='btn menu-btn'> <FaUserCircle /> SIGN IN</button>
          </div>

          <hr className='hr'/>

          <li className='menu-item'>
            <BsFileEarmarkMusic />
            <span>Music</span>
          </li>
          <li className='menu-item'>
            <MdOutlineSportsBasketball />
            <span>Sport</span>
          </li>
          <li className='menu-item'>
            <RiGamepadLine />
            <span>Gaming</span>
          </li>
          <li className='menu-item'>
            <MdOutlineMovie />
            <span>Movies</span>
          </li>
          <li className='menu-item'>
            <HiOutlineNewspaper />
            <span>News</span>
          </li>
          <li className='menu-item'>
            <MdOutlineLiveTv />
            <span>Live</span>
          </li>
          <hr className='hr'/>
          <li className='menu-item'>
            <CiSettings />
            <span>setings</span>
          </li>
          <li className='menu-item'>
            <TbReport />
            <span>Report</span>
          </li>
          <li className='menu-item'>
            <MdHelpOutline />
            <span>Help</span>
          </li>
          <li className='menu-item'>
            <MdOutlineLightMode />
            <span>Light Mode</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Menu
