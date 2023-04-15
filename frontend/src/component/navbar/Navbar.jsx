import './navbar.css'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <div className="navbar-wrapper">
        <div className="navbar-search">
          <input type="text" placeholder='search..' />
          <AiOutlineSearch />
        </div>
        <button className='btn navbar-btn'><FaUserCircle /> SIGN IN</button>
      </div>
    </div>
  )
}

export default Navbar
