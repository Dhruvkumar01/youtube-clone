import Menu from '../../component/menu/Menu'
import Navbar from '../../component/navbar/Navbar'
import './video.css'

// IMPORT REACT LIBRARY
import { Suspense, lazy, useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import chanelImg from '../../image/user.png'
// Icons 
import { BiDislike, BiLike } from 'react-icons/bi'
import { RiShareForwardLine } from 'react-icons/ri'
import { TfiDownload } from 'react-icons/tfi'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'

// IMPORT REDUX SLICES
import { dislike, fetchFail, fetchStart, fetchSuccess, like } from '../../redux/videoSlice.js'
import { subscribe, unsubscribe } from '../../redux/userSlice.js'
import { userRequest } from '../../requestMethod'

// LAZY COMPONENTS 
const Hrcard= lazy(()=> import('../../component/hrcard/Hrcard'));
const Comments= lazy(()=> import('../../component/comments/Comments'));

const Video = () => {
  const id = useLocation().pathname.split('/')[2];
  const dispatch = useDispatch();
  const [channel, setChannel] = useState({});
  const [sideVideo, setSideVideo] = useState([]);
  const { currentVideo } = useSelector(state => state.video)
  const { currentUser } = useSelector(state => state.user)
  const { currentTheme } = useSelector(state => state.theme)
  const { pauseHistory } = useSelector(state => state.pauseHistory);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart())
      try {
        const videoRes = await axios.get(`http://localhost:5000/api/videos/find/${id}`);
        await axios.put(`http://localhost:5000/api/videos/view/${videoRes.data._id}`);
        const channelRes = await axios.get(`http://localhost:5000/api/users/find/${videoRes.data.userId}`)
        const tags = videoRes.data.tags.join(',');
        const hrVideoRes = await axios.get(`http://localhost:5000/api/videos/tag?tags=${tags}`)
        setChannel(channelRes.data);
        setSideVideo(hrVideoRes.data);
        dispatch(fetchSuccess(videoRes.data))
        currentUser && !pauseHistory && await userRequest.post(`historys`, {
          videoId: id,
          userId: currentUser._id
        });
      } catch (err) {
        dispatch(fetchFail())
      }
    }
    fetchData();
  }, [id, dispatch, currentUser, pauseHistory])

  const handleLike = async () => {
    try {
      await userRequest.put(`users/like/${currentUser._id}`, { videoId: currentVideo._id });
      dispatch(like(currentUser._id))
    } catch (err) {
      console.log(err);
    }
  }

  const handleDislike = async () => {
    try {
      await userRequest.put(`users/dislike/${currentUser._id}`, { videoId: currentVideo._id });
      dispatch(dislike(currentUser._id))
    } catch (err) {
      console.log(err);
    }
  }

  const handleSub = async () => {
    try {
      await userRequest.put(`users/sub/${currentUser._id}`, { channelId: channel._id });
      dispatch(subscribe(channel._id));
    } catch (err) {
      console.log(err)
    }
  }

  const handleUnsub = async () => {
    try {
      await userRequest.put(`users/unsub/${currentUser._id}`, { channelId: channel._id });
      dispatch(unsubscribe(channel._id));
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={currentTheme === "light" ? "light-container" : "dark-container"} >
      <Menu />
      <div className="right-container">
        <Navbar />
        <div className="video-main">
          <div className="video-content">
            <div className="video-wrapper">
              <video src={currentVideo.video_url} className="video-frame" controls ></video>
            </div>
            <h3 className="video-title">{currentVideo.name}</h3>
            <div className="video-details">
              <div className="chanel-details">
                <img src={chanelImg} alt="" />
                <div className="chanel-info">
                  <p>{channel.name}</p>
                  <p className='chanel-sub'>{channel.subscriberNo} Subscribers</p>
                </div>
                <div className="chanel-btns">
                  <div className="left-btns">
                    {currentUser !== null &&
                      currentUser.subscribedChannel.includes(channel._id) ?
                      <button className='btn chanel-btn' onClick={handleUnsub}>Subscribed</button>
                      :
                      <button className='btn chanel-btn' onClick={handleSub}>Subscribe</button>
                    }
                  </div>
                  {currentUser === null ? <p>Sign in to like share subscribe and download </p> :
                    <div className="right-btns">
                      <button className='btn chanel-btn'>
                        {currentVideo.likes?.includes(currentUser._id) ? <AiFillLike style={{ "fontSize": "18px" }} /> : <BiLike style={{ "fontSize": "18px" }} onClick={handleLike} />}
                        {currentVideo.likes.length} "|"
                        {currentVideo.dislike?.includes(currentUser._id) ? <AiFillDislike style={{ "fontSize": "18px" }} /> : <BiDislike style={{ "fontSize": "18px" }} onClick={handleDislike} />}
                      </button>
                      <button className='btn chanel-btn'><RiShareForwardLine style={{ "fontSize": "20px" }} />
                        <span>Share</span>
                      </button>
                      <button className='btn chanel-btn'><TfiDownload /> <span>Download</span></button>
                    </div>
                  }
                </div>
              </div>
            </div>
            <hr className="hr" />
            <section className={currentTheme === "dark" ? "description" : "description bg-light-variant"} >
              <div className="description-top">
                <span>{currentVideo.views} Views</span>
                <span>{new Date(currentVideo.createdAt).toJSON().slice(0, 10).split('-').reverse().join(' ')}</span>
                <p style={{ color: "#c9c9c9" }}>{
                  currentVideo.tags.map(tag => (
                    <span>{tag}</span>
                  ))
                }</p>
              </div>
              <div className="description-info">
                <p>{currentVideo.desc}</p>
              </div>
            </section>
            <Suspense fallback={<p>Loading...</p>} >
              <Comments id={currentVideo._id} type="video" />
            </Suspense>
          </div>
          <div className="recomendation">
            {
              sideVideo.map(video => (
                <Suspense fallback={<p>Loading...</p>} >
                  <Hrcard key={video._id} video={video} />
                </Suspense>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
