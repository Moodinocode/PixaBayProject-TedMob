import React,{useState} from 'react'
//import { PiVideoDuotone } from "react-icons/pi";
//import { GoVideo } from "react-icons/go";
import { RxVideo } from "react-icons/rx";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';


const MediaItem = ({item}, like = false) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [liked, setLiked] =  useState(false);//needs change
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleClick = () => {
    setIsEnlarged(!isEnlarged);
  }
  const handleLike = async (e) => {
    e.stopPropagation(); // Prevents triggering the handleClick event
    console.log(localStorage)
    await setLiked(!liked);
    console.log('front end', token)
    console.log('front end', liked)
    //send to the backend
    try {
      const response = await axios.post('http://localhost:5000/favorites',{item,token,liked})
    } catch (err) {
      setError(err.response.data.message)
      console.log('error:',error)
    }
  }

  return (
    <div onClick={handleClick} className='relative cursor-pointer'>
      {item.type === 'image' ? (
        isEnlarged ? (
          <>
            <img src={item.userImageURL} alt={item.tags} className='w-full h-auto'/>
            <div>
            {liked ? (
              <FaHeart
                onClick={handleLike}
                className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
              />
            ): (
              <FiHeart
              onClick={handleLike}
              className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
            />
            
            )
            }
            </div>
          </>
        ): (         
          <>
            <img src={item.userImageURL} alt={item.tags} className='w-full h-auto'/>
            <div>
            {liked ? (
              <FaHeart
                onClick={handleLike}
                className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
              />
            ): (
              <FiHeart
              onClick={handleLike}
              className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
            />
            
            )
            }
            </div>
          </>)
      ): isEnlarged ? (
        <>
          <video controls autoPlay style={{ width: '100%', height: 'auto' }}>
            <source src={item.videos.medium.url} type="video/mp4" />
          </video>
          <div>
            {liked ? (
              <FaHeart
                onClick={handleLike}
                className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
              />
            ): (
              <FiHeart
              onClick={handleLike}
              className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
            />
            )
            }
            </div>
        </>
      ): (         
        <>
          <img src={item.userImageURL} alt={item.tags} className='w-full h-auto'/>
          {/* <PiVideoDuotone className='text-8xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 bg-black bg-opacity-50 text-white' /> */}
          {/* <GoVideo  className='text-8xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1  bg-opacity-50 text-white' /> */}
          <RxVideo  className='text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1  bg-black bg-opacity-30 text-white' />
          <div>
            {liked ? (
              <FaHeart
                onClick={handleLike}
                className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
              />
            ): (
              <FiHeart
              onClick={handleLike}
              className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
            />
            
            )
            }
            </div>
        </>
      )}
    </div>
  )
}


export default MediaItem