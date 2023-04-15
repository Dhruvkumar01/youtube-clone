import Menu from '../../component/menu/Menu'
import Navbar from '../../component/navbar/Navbar'
import './login.css'

const Login = () => {
  return (
    <section className="login-container">
        <Menu />
        <div className="right-container">
            <Navbar />
            <div className="login-main">
                <div className="login">
                    <p>Youtube Sign Up Page</p>
                    <form className='login-form'>
                        <input type="text" placeholder='username...'/>
                        <input type="text" placeholder='password' />
                        <button className='btn fbtn'>Login</button>
                    </form>
                    <button className="btn gbtn">Sign in With Google</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login
