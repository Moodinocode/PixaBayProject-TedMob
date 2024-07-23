import React,{useState} from 'react'
import { PiVideoDuotone } from "react-icons/pi";
import { FaRegImage } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import axios from 'axios';


const MediaItem = ({item}, like = false) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [liked, setLiked] =  useState(like);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleClick = () => {
    setIsEnlarged(!isEnlarged);
  }
  const handleLike = async (e) => {
    e.stopPropagation(); // Prevents triggering the handleClick event
    setLiked(!liked);
    //send to the backend

    //getting token
    // const token = localStorage.getItem('token'); 
    // if (!token) {
    //   throw new Error('No token found');
    // }
    //decoded.userId; // Adjust this based on your token's payload structure

  //const decoded = jwt_decode(token);
    try {
      const response = await axios.post('http://localhost:5000/favorites',{item,token,liked})//either send with it the liked balue or have to check the db if already liked or not
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
                className='text-4xl absolute top-9 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
              />
            ): (
              <FiHeart
              onClick={handleLike}
              className='text-4xl absolute top-9 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
            />
            
            )
            }
            </div>
          </>
        ): (         
          <>
            <img src={item.userImageURL} alt={item.tags} className='w-full h-auto'/>
            <FaRegImage className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white' /> 
            <div>
            {liked ? (
              <FaHeart
                onClick={handleLike}
                className='text-4xl absolute top-9 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
              />
            ): (
              <FiHeart
              onClick={handleLike}
              className='text-4xl absolute top-9 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
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
                className='text-4xl absolute top-9 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
              />
            ): (
              <FiHeart
              onClick={handleLike}
              className='text-4xl absolute top-9 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
            />
            
            )
            }
            </div>
        </>
      ): (         
        <>
          <img src={item.userImageURL} alt={item.tags} className='w-full h-auto'/>
          <PiVideoDuotone className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white' />
          <div>
            {liked ? (
              <FaHeart
                onClick={handleLike}
                className='text-4xl absolute top-9 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
              />
            ): (
              <FiHeart
              onClick={handleLike}
              className='text-4xl absolute top-9 right-0 p-1 bg-black bg-opacity-50 text-white pointer'
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