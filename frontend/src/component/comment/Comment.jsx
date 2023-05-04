import './comment.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillCaretDown, AiFillDislike, AiFillLike } from 'react-icons/ai'
import {BiDislike, BiLike} from 'react-icons/bi'
import { useSelector } from 'react-redux'
import NewComment from '../newComment/NewComment'
import Comments from '../comments/Comments'
import { useNavigate } from 'react-router-dom'

const Comment = ({comment}) => {
  const navigate= useNavigate();
  const [user, setUser]= useState({});
  const { currentUser } = useSelector(state=> state.user)
  const [open, setOpen]= useState(false);
  const [openReply, setOpenReply]= useState(false);
  
  useEffect(()=>{
    const fetchUser= async ()=>{
      const res= await axios.get(`http://localhost:5000/api/users/find/${comment.userId}`);
      setUser(res.data)
    }
    fetchUser();

  }, [comment.userId])

  const handleLike= async ()=>{
    try {
      await axios.put(`http://localhost:5000/api/comments/like/${comment._id}`, {userId: currentUser._id});
      // dispatch(like(currentUser._id))
    } catch (err) {
      navigate('/error', {
        state: {
          name: "Comment Like",
          message: `${err.response.data.message}`
        }
      })
    }
  }

  const handleDislike= async ()=>{
    try {
      await axios.put(`http://localhost:5000/api/comments/dislike/${comment._id}`, {userId: currentUser._id});
      // dispatch(dislike(currentUser._id))
    } catch (err) {
      navigate('/error', {
        state:{
          name: "Comment Dislike",
          message: `${err.response.data.message}`
        }
      })
    }
  }

  return (
    <div className='comment-container'>
      <img src={user.img} alt={user.name} className='comment-user-image' referrerPolicy='no-referrer'/>
      <div className="comment-details">
        <div className="comment-info">
          <p className="comment-user-name">{user.name} {"2 days ago"}</p>
          <p>{comment.desc}</p>
        </div>
        {currentUser !== null &&
        <>
          <div className="comment-like">
            { comment.likes?.includes(currentUser._id)? <AiFillLike style={{"fontSize": "18px"}} /> : <BiLike style={{"fontSize": "18px"}} onClick={handleLike} /> }
              <span style={{marginLeft: "5px", marginRight:"10px"}}> {comment.likes.length} </span> 
            { comment.dislikes?.includes(currentUser._id)? <AiFillDislike style={{"fontSize": "18px"}} /> : <BiDislike style={{"fontSize": "18px"}} onClick={handleDislike} /> }
            <span className='comment-reply' onClick={()=>setOpen(true)}>Reply</span>
          </div>
          { open && <NewComment currentUser={currentUser} type="comment" id={comment._id} setOpen={setOpen} />}
          { comment.numberOfComments> 0 && 
            <button className='comment-replies' onClick={()=> setOpenReply(!openReply)}><AiFillCaretDown style={{marginRight: "10px"}} /> { comment.numberOfComments } replies</button>
          } 
          { openReply===true  && <Comments id={comment._id} type="comment" /> }
            
        </>
        }
      </div>
    </div>
  )
}

export default Comment
