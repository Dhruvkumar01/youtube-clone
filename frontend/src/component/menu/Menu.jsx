import './menu.css'
import { MdHelpOutline, MdHome, MdOutlineDarkMode, MdOutlineExplore, MdOutlineHistory, MdOutlineLightMode, MdOutlineLiveTv, MdOutlineMovie, MdOutlineSportsBasketball, MdOutlineSubscriptions, MdOutlineVideoLibrary } from 'react-icons/md'
import { BsFileEarmarkMusic } from 'react-icons/bs'
import { RiGamepadLine } from 'react-icons/ri'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { CiSettings } from 'react-icons/ci'
import { TbReport } from 'react-icons/tb'
import { FaUserCircle } from 'react-icons/fa'
import { GoThreeBars } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeMode } from '../../redux/themeSlice.js'
import { useState } from 'react'

const Menu = () => {
  const currentUser = useSelector(state=>state.user.currentUser);
  const { currentTheme } = useSelector(state=> state.theme);
  const dispatch= useDispatch();
  const navigate= useNavigate();

  const [open, setOpen]= useState(false);

  const handleSub= ()=>{
    if(currentUser !==null){
      navigate('/sub');
    } else{
      navigate('/error', {
        state: {
          name: "Subscribe Videos",
          message: "Login To See Subscribed Videos"
        }
      })
    }
  }

  return (
    <div className="menu-container">
      <div className="menu-wrapper">
        <div className="menu-top">
          <GoThreeBars className='menu-top-icon' onClick={()=> setOpen(!open)} />
        </div>
        <ul className="menu-item-container">
          <Link to="/" className='link' >
            <li className={open===true? 'menu-item': 'menu-item-close'}>
              <MdHome className='menu-icon'/>
              { open && <span>Home</span>}
            </li>
          </Link>
          <Link to='/trend' className='link'>
            <li className={open===true? 'menu-item': 'menu-item-close'}>
              <MdOutlineExplore className='menu-icon' />
              {open && <span>Explore</span>}
            </li>
          </Link>
          <li className={open===true? 'menu-item': 'menu-item-close'} onClick={handleSub}>
            <MdOutlineSubscriptions className='menu-icon'/>
            { open && <span>Subscription</span>}
          </li>

          { open && <hr className='hr'/>}

          { open &&
            <li className='menu-item'>
              <MdOutlineVideoLibrary />
              <span>Library</span>
            </li>
          }

          <Link to='/history' className='link'>
            <li className={open===true? "menu-item": "menu-item-close"} >
              <MdOutlineHistory className='menu-icon'/>
              { open && <span>History</span>}
            </li>
          </Link>


          {open && !currentUser &&
            <>
              <hr className='hr'/>
              <div className="menu-login">
                <p>Signin To Like Videos, Share and Subcribe</p>
                <Link to='/login' className='link'>
                  <button className='btn menu-btn'> <FaUserCircle /> SIGN IN</button>
                </Link>
              </div>
            </>
          }

          { open &&<hr className='hr'/> }
          
            <li className={open===true? 'menu-item': 'disnone'}>
              <BsFileEarmarkMusic />
              <span>Music</span>
            </li>
          
          
            <li className={open===true? 'menu-item': 'disnone'}>
              <MdOutlineSportsBasketball />
              <span>Sport</span>
            </li>
          
          
            <li className={open===true? 'menu-item': 'disnone'}>
              <RiGamepadLine />
              <span>Gaming</span>
            </li>
          
          
            <li className={open===true? 'menu-item': 'disnone'}>
              <MdOutlineMovie />
              <span>Movies</span>
            </li>
          
          
            <li className={open===true? 'menu-item': 'disnone'}>
              <HiOutlineNewspaper />
              <span>News</span>
            </li>
          
          
            <li className={open===true? 'menu-item': 'disnone'}>
              <MdOutlineLiveTv />
              <span>Live</span>
            </li>
          
          {open && <hr className='hr'/> }
          
            <li className={open===true? "menu-item": "disnone"} >
              <CiSettings />
              <span>setings</span>
            </li>
          
          
            <li className={open===true ? 'menu-item': 'disnone'}>
              <TbReport />
              <span>Report</span>
            </li>
          
          
            <li className={open===true ? 'menu-item': 'disnone'}>
              <MdHelpOutline />
              <span>Help</span>
            </li>
          
          {currentTheme==="dark"? 
            <li className={open===true? "menu-item": "menu-item-close"} onClick={()=> dispatch(changeMode())}>
              <MdOutlineLightMode className='menu-icon'/>
              {open && <span>Light Mode</span>}
            </li>
            :
            <li className={open===true? "menu-item": "menu-item-close"} onClick={()=> dispatch(changeMode())}>
              <MdOutlineDarkMode className='menu-icon'/>
              {open && <span>Dark Mode</span>}
            </li>
          }
        </ul>
      </div>
    </div>
  )
}

export default Menu
