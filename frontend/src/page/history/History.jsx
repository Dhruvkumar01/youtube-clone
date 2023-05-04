import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './history.css'
// COMPONENTS
import Menu from '../../component/menu/Menu'
import Navbar from '../../component/navbar/Navbar'
import HistoryCard from '../../component/historyCard/HistoryCard'

// REACT ICONS
import { AiOutlinePauseCircle, AiOutlineSearch } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { GrRadialSelected } from 'react-icons/gr'
import { RxResume} from 'react-icons/rx'

// REDUX SLICES
import { changePauseHistoryStatus } from '../../redux/pauseHistorySlice'

import { userRequest } from '../../requestMethod'

const History = () => {
  const dispatch= useDispatch();
  const { currentUser }= useSelector(state=> state.user);
  const { currentTheme }= useSelector(state=> state.theme);
  const { pauseHistory }= useSelector(state=> state.pauseHistory);
  const [historyVideos, setHistoryVideos]= useState([]);

  useEffect(()=>{
    const fetchData= async ()=>{
        const res= await userRequest.get(`historys/all/${currentUser._id}`);
        setHistoryVideos(res.data);
    }
    
    currentUser && fetchData();

  }, [currentUser]) 

  const handleDelete= async ()=> {
    console.log("all delete clicked");
    const res= await userRequest.delete(`historys/all/${currentUser._id}`);
    res.status=== 201 && console.log("your all history deleted");
  }

  return (
    <div className={currentTheme=== "light"? "light-container": "dark-container"} >
      <Menu />
      <div className="right-container">
        <Navbar />
        <div className="history-container">
            <div className="history-videos">
                {
                    historyVideos.map((video, index) => {
                        return( 
                            <div key={index}>
                                <p style={{margin: "10px 0"}}> {video._id.day}- {video._id.month}- {video._id.year}</p>
                                {
                                    video.historys.map(history=> (
                                        <HistoryCard key={history.videoId} history={history} />
                                    ))
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="history-setting">
                <div className="history-setting-wrapper">
                    <div className="history-setting-input-container">
                        <AiOutlineSearch />
                        <input type="text" placeholder='search in history' />
                    </div>
                    <h3>History type</h3>
                    <hr className='hrbold'/>
                    <div className='watch-history-option'>
                        <p>Watch History</p>
                        <GrRadialSelected />
                    </div>
                    <hr className="hrbold" />
                    <div className="history-setting-option-container" onClick={handleDelete}>
                        <MdDelete />
                        <p>Clear All watch history</p>
                    </div>
                    { pauseHistory === false?
                        <div className="history-setting-option-container" onClick={()=> dispatch(changePauseHistoryStatus())}>
                            <AiOutlinePauseCircle />
                            <p>Pause watch History</p>    
                        </div>
                        :
                        <div className="history-setting-option-container" onClick={()=> dispatch(changePauseHistoryStatus())}>
                            <RxResume />
                            <p>Resume watch History</p>    
                        </div>
                        
                    }
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default History
