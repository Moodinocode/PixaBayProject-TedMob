import React,{useState} from 'react'
import { PiVideoDuotone } from "react-icons/pi";
import { FaRegImage } from "react-icons/fa6";

const MediaItem = ({item}) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleClick = () => {
    setIsEnlarged(!isEnlarged);
  }

  return (
    <div onClick={handleClick} className='relative cursor-pointer'>
      {item.type === 'image' ? (
        isEnlarged ? (
          <>
            <img src={item.userImageURL} alt={item.tags} className='w-full h-auto'/>
          </>
        ): (         
          <>
            <img src={item.userImageURL} alt={item.tags} className='w-full h-auto'/>
            <FaRegImage className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white' /> 
          </>)
      ): isEnlarged ? (
        <>
          <video controls autoPlay style={{ width: '100%', height: 'auto' }}>
            <source src={item.videos.medium.url} type="video/mp4" />
          </video>
        </>
      ): (         
        <>
          <img src={item.userImageURL} alt={item.tags} className='w-full h-auto'/>
          <PiVideoDuotone className='text-4xl absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white' />
        </>
      )}
    </div>
  )
}


export default MediaItem