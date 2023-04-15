import './comment.css'
import user from '../../image/user.png'

const Comment = () => {
  return (
    <div className='comment-container'>
      <img src={user} alt="Not found" className='comment-user-image'/>
      <div className="comment-info">
        <p className="comment-user-name">{"Dhruv Kumar"} {"2 days ago"}</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt vel eum odit dignissimos temporibus et minima ipsa fuga perferendis? Ab!</p>
      </div>
    </div>
  )
}

export default Comment
