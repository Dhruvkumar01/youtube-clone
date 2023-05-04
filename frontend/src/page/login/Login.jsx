import { useState } from 'react'
import Menu from '../../component/menu/Menu'
import Navbar from '../../component/navbar/Navbar'
import './login.css'
import { GrFormView } from 'react-icons/gr'
import { FaEyeSlash } from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import { loginFail, loginStart, loginSuccess } from '../../redux/userSlice.js'
import { userRequest } from '../../requestMethod.js'
import {auth, provider} from '../../firebase.js'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [name, setName]= useState("");
    const [password, setPassword]= useState("");
    const [type, setType]= useState("password")

    const { currentTheme }= useSelector(state=> state.theme)

    const handleSubmit= async (e)=>{
        e.preventDefault();
        dispatch(loginStart())
        try {    
            const res= await userRequest.post('/auth/signin', {name, password})
            dispatch(loginSuccess(res.data));
            res.status===200 && navigate('/')
        } catch (err) {
            dispatch(loginFail())
            console.log(err);
            navigate('/error', {
                state:{
                    name: "Login",
                    message: `${err.response.data.message}`
                }
            })
        }
    }

    const handleView= (e)=>{
        if(type=== "text"){
            setType("password")
        } else{
            setType("text")
        }
    }

    const signInWithGoogle= async ()=> {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
          .then(res=> {
            userRequest.post('/auth/google', {
                name: res.user.displayName,
                email: res.user.email,
                img: res.user.photoURL,
            })
              .then(result=> {
                dispatch(loginSuccess(result.data));
                navigate('/');
              })
          })
          .catch(err=> {
            dispatch(loginFail());
            navigate('/error', {
                state: {
                    name: "Login",
                    message: `${err.response.data.message}`
                }
            });
          })
    }

  return (
    <section className={currentTheme=== "light"? "light-container": "dark-container"} >
        <Menu />
        <div className="right-container">
            <Navbar />
            <div className="login-main">
                <div className="login">
                    <form className='login-form' onSubmit={handleSubmit}>
                        <input type="text" placeholder='username...' onChange={e=> setName(e.target.value)} />
                        <div className="password">
                            <input type={type} placeholder='password'  onChange={e=> setPassword(e.target.value)} />
                            { type=== "text" ? <GrFormView className='view-password' onClick={handleView} style={{fontSize: "19px"}}/>: <FaEyeSlash className='view-password' onClick={handleView}/>}
                        </div>
                        <button className='btn fbtn'>Login</button>
                    </form>
                    <button className="btn gbtn" onClick={signInWithGoogle}>Sign in With Google</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login
