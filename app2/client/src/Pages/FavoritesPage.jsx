import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios'
import MediaItem from '../components/MediaItem'


const FavoritesPage = () => {
  const [media, setMedia] = useState([]);
  const token = localStorage.getItem('token');





  useEffect(()=> {
    const getMedia = async () => {
      try {
        const data = await axios.post('http://localhost:5000/favorites/page',{token})
        setMedia(data)
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    }
    getMedia();
  },[])


  return (
    <>
      <Navbar/>
      <div className="container-xl lg:container m-auto bg-blue-50 px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {media.map((item) => (
            <MediaItem key={item.id} item={item}/>
          )
          )}
        </div>
      </div>
    </>
  )
}

export default FavoritesPage