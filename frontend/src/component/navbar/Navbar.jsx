import './navbar.css'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { logout } from '../../redux/userSlice.js'
import { BiVideoPlus } from 'react-icons/bi'
import Upload from '../upload/Upload'
import { changeMode } from '../../redux/themeSlice.js'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import youtube from '../../image/youtube.jpg'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.currentUser)
  const { currentTheme } = useSelector(state => state.theme);
  const [view, setView] = useState(0);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleClick = () => {
    setView(!view);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate('/search', {
      state: {
        query: `${query}`
      }
    })
  }

  return (
    <>
      <div className='navbar-container'>
        <div className="navbar-wrapper">
          <div className="nav-left">
            <Link to='/' className='link'>
              <div className="logo">
                <img src={youtube} alt="youtube-logo" />
                <p>YouTube</p>
              </div>
            </Link>
          </div>
          <div className="nav-right">
            <form className="navbar-search" onSubmit={handleSearch}>
              <input type="text" placeholder='search..' onChange={(e) => setQuery(e.target.value)} />
              <AiOutlineSearch />
            </form>
            {currentUser === null ?
              <Link to='/login' className='link'>
                <button className='btn navbar-btn'><FaUserCircle /> SIGN IN</button>
              </Link>
              :
              <>
                <BiVideoPlus className='video-upload-icon' onClick={() => setOpen(true)} />
                <div className='user-profile'>
                  <img src={currentUser.img} alt={currentUser.name[0]} onClick={handleClick} referrerPolicy='no-referrer' />
                </div>
                <div className={view === true ? "user-profile-click" : "disnone"}>
                  <img src={currentUser.img} alt={currentUser.name[0]} referrerPolicy='no-referrer' />
                  <div className="user-profile-details">
                    <h3>{currentUser.name}</h3>
                    <p>{currentUser.email}</p>
                    {currentTheme === "dark" ?
                      <div className='mode-btn' onClick={() => dispatch(changeMode())}>
                        <MdOutlineLightMode />
                        <span>Light Mode</span>
                      </div>
                      :
                      <div className='mode-btn' onClick={() => dispatch(changeMode())}>
                        <MdOutlineDarkMode />
                        <span>Dark Mode</span>
                      </div>
                    }
                    <button className='btn' onClick={() => dispatch(logout())}>Logout</button>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar
