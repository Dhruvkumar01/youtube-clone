import './comments.css'
import user from '../../image/user.png'
import Comment from '../comment/Comment'

const Comments = () => {
  return (
    <section className='comments-container'>
      <div className="add-new-comment">
        <img src={user} alt="not found" />
        <input type="text" placeholder='Add a comment' />
      </div>
      <div>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </section>
  )
}

export default Comments
