import Menu from '../../component/menu/Menu'
import Navbar from '../../component/navbar/Navbar'
import './video.css'
import chanelImg from '../../image/user.png'
import {BiDislike, BiLike} from 'react-icons/bi'
import { RiShareForwardLine } from 'react-icons/ri'
import { TfiDownload } from 'react-icons/tfi'
import { MdOutlineSort } from 'react-icons/md'
import Comments from '../../component/comments/Comments'
import Hrcard from '../../component/hrcard/Hrcard'

const Video = () => {
  return (
    <div className='video'>
      <Menu />
      <div className="right-container">
        <Navbar />
        <div className="video-main">
            <div className="video-content">
              <div className="video-wrapper">
                <iframe 
                      width="100%" 
                      height="540" 
                      src="https://www.youtube.com/embed/zjHguYm17lg" 
                      title="YouTube video player" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowfullscreen
                ></iframe>
              </div>
              <h3 className="video-title">Garam Godam (Khesari Lal Yadav)</h3>
              <div className="video-details">
                <div className="chanel-details">
                  <img src={chanelImg} alt="" />
                  <div className="chanel-info">
                    <p>Dhruv Kumar</p>
                    <p className='chanel-sub'>100k Subscribers</p>
                  </div>
                  <div className="chanel-btns">
                    <div className="left-btns">
                      <button className='btn chanel-btn'>Subscribe</button>
                    </div>
                    <div className="right-btns">
                      <button className='btn chanel-btn'><BiLike style={{"fontSize": "18px"}}/> {"1.8k"} {"|"} <BiDislike style={{"fontSize": "18px"}} /></button>
                      <button className='btn chanel-btn'><RiShareForwardLine style={{"fontSize": "20px"}}/> <span>Share</span></button>
                      <button className='btn chanel-btn'><TfiDownload /> <span>Download</span></button>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="hr" />
              <section className="description">
                <div className="description-top">
                  <span>{"120k views"}</span>
                  <span>{"2 months ago"}</span>
                  <span style={{color: "#c9c9c9"}}>{"react portfolio app"}</span>
                </div>
                <div className="description-info">
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci amet dolor molestiae magni dolorum, atque voluptatem omnis ex a necessitatibus dicta voluptates numquam.</p>
                </div>
              </section>
              <section className='video-comments'>
                <div className='video-comment-info'>
                  <p>{"14 Comments"}</p>
                  <p style={{display: "flex", alignItems: "center", gap: "5px"}}>
                    <MdOutlineSort style={{fontSize: "30px", color: "gray"}}/> 
                    <span>Sort By</span>
                  </p>
                </div>
                <Comments />
              </section>
            </div>
            <div className="recomendation">
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
              <Hrcard />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Video
