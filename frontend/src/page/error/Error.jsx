import { useSelector } from 'react-redux';
import './error.css'
import Menu from '../../component/menu/Menu';
import Navbar from '../../component/navbar/Navbar';
import { useLocation } from 'react-router-dom';

const Error = () => {
  const { currentTheme } = useSelector(state=> state.theme);
  const location = useLocation();

  return (
    <div className={currentTheme=== "light"? "light-container": "dark-container"} >
      <Menu />
      <div className="right-container">
        <Navbar />
        <div className="error-container">
            <div className="error-wrapper">
                <h4>Eroor Occured During {location.state?.name} Process</h4>
                <hr className="hr" />
                <h2>Mesage: {location.state?.message} </h2>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Error
