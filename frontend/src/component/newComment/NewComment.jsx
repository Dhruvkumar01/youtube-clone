import { useState } from 'react';
import './newComment.css'
import axios from 'axios';

const NewComment = ({currentUser, type, id, setOpen}) => {
    const [comment, setComment]= useState("");
    const [focus, setFocus]= useState("off");
    const handleSubmit= async ()=> {
        if(type==="video"){
            await axios.post(`http://localhost:5000/api/comments`, {videoId: id, desc: comment});
            setComment("");
        } else{
            await axios.put(`http://localhost:5000/api/comments/reply/${id}`, {
                desc: comment,
                userId: currentUser._id,
                commentId: id
            })
        }
        setOpen(false);
        setFocus("off");
    }
    
    const handleCancel= ()=>{
        setComment("");
        setFocus("off");
        setOpen(false);
    }

  return (
    <div className="add-new-comment">
        <div className='add-new-comment-top'>
            <img src={currentUser.img} alt={currentUser.name[0]} referrerPolicy='no-referrer' />
            <input type="text" placeholder='Add a comment' className='comment-input' onChange={(e)=> setComment(e.target.value)} onFocus={(e)=> setFocus("on")}/>
        </div>
        <div className={ focus==="on"? "comment-btns": "disnone"}>
            <button className="btn cancel-btn" onClick={handleCancel}>Cancel</button>
            <button className={ comment===""? "btn comment-btn": "btn comment-btn bg-blue"} onClick={handleSubmit}>Comment</button>
        </div>
    </div>
  )
}

export default NewComment
