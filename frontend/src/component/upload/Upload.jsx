import { useEffect, useState } from 'react'
import './upload.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase.js';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Upload = ({ setOpen }) => {
    const [video, setVideo] = useState(null);
    const [image, setImage] = useState(null);
    const [imageperc, setImageperc] = useState(0);
    const [videoperc, setVideoperc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([])
    const { currentTheme }= useSelector(state=> state.theme)

    const navigate= useNavigate();

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "img_url" ? setImageperc(progress) : setVideoperc(Math.floor(progress));

                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setInputs(prev => {
                        return { ...prev, [urlType]: downloadURL }
                    })
                });
            }
        )};

        useEffect(() => {
            video && uploadFile(video, "video_url")
        }, [video]);

        useEffect(() => {
            image && uploadFile(image, "img_url")
        }, [image])

        const handleUpload = async (e) => {
            e.preventDefault();
            try {
                const res= await axios.post('http://localhost:5000/api/videos', {...inputs, tags});
                setOpen(false);
                res.status===200 && navigate(`/videos/${res.data._id}`);
            } catch (err) {
                navigate('/error', {
                    state: {
                        name: "Video Upload",
                        message: `${err.response.data.message}`
                    }
                })
            }
        }

        return (
            <div className='upload-container'>
                <div className={currentTheme==="light"? "upload-wrapper bg-white": "upload-wrapper"} >
                    <span onClick={() => setOpen(false)} className='close-upload'>X</span>
                    <h2 className='text-centre'>Upload a new video</h2>
                    <label>Video:</label>
                    { videoperc> 0? ("uploading"+ videoperc+ "%") : (
                        <input type="file" accept='video/*' onChange={(e) => setVideo(e.target.files[0])} />
                    )}
                    <input type="text" name='name' placeholder='video-name...' className='upload-input' onChange={handleChange} />
                    <textarea type="text" name='desc' placeholder='description of video' rows="8" className='upload-input' onChange={handleChange}></textarea>
                    <input type="text" placeholder='seprate tags with comma' className='upload-input' onChange={(e) => setTags(e.target.value.split(','))} />
                    <label>Image:</label>
                    { imageperc> 0? ("uploading"+ imageperc+ "%" ) : (
                        <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                    )}
                    <button className='btn upload-btn' onClick={handleUpload}>Upload</button>
                </div>
            </div>
        )
    }

    export default Upload
