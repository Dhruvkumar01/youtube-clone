import './comments.css'
import Comment from '../comment/Comment'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { MdOutlineSort } from 'react-icons/md'
import NewComment from '../newComment/NewComment'

const Comments = ({id, type}) => {
  const currentUser= useSelector(state=> state.user.currentUser);
  const [comments, setComments]= useState([]);
  const [open, setOpen]= useState(false);
  useEffect(()=>{
    const fetchComments= async ()=>{
      if(type==="video"){
        const res= await axios.get(`http://localhost:5000/api/comments/${id}`)
        setComments(res.data)
      } else{
        console.log(id);
        const res= await axios.get(`http://localhost:5000/api/comments/find/${id}`);
        setComments(res.data);
      }
    }
    fetchComments();
  },[id, type])


  return (
    <section className='comments-container'>
      { type==="video" && <div className='video-comment-info'>
        <p>{comments.length} Comments</p>
        <p style={{display: "flex", alignItems: "center", gap: "5px"}}>
          <MdOutlineSort style={{fontSize: "30px", color: "gray"}}/> 
          <span>Sort By</span>
        </p>
      </div>
      }
      {currentUser!==null && type==="video" && <NewComment currentUser={currentUser} type="video" id={id} setOpen={setOpen}/>}
      <div className='all-comments'>
        {
          comments.map(comment=> (
            <Comment key={comment._id} comment={comment} setOpen={setOpen} />
          ))
        }
      </div>
    </section>
  )
}

export default Comments
