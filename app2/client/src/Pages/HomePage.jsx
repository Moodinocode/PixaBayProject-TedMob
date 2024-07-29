import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar';
import { fetchMedia } from '../services/pixabayService';
import MediaItem from '../components/MediaItem';



const HomePage = () => {
  const [media, setMedia] = useState([]);
  const [query,setQuery] = useState('nature') //defualt is nature
  const [likedItems,setLikedItems] = useState([]);
  const token = localStorage.getItem('token');
  

  useEffect(()=> {
    const getMedia = async () => {
      try {
        const data = await fetchMedia(query)
        setMedia(data)
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    }
    const getLikedItems = async () => {
      try {
        const response  = await axios.post('http://localhost:5000/favorites/page',{token})
        console.log('returned data:', response.data)
        setLikedItems(response.data)
      } catch (error) {
        
      }
    }
    getLikedItems()
    getMedia();
  },[query,token])

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
  }

 

  return (
    <>
      <Navbar/>
      <SearchBar onSearch={handleSearch}/>
        <div className="container-xl lg:container m-auto bg-blue-50 px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {media.map((item) => {
              console.log(likedItems.includes(item))
              console.log(item.id)
  
            return (
              <MediaItem key={item.id} item={item} like={likedItems.includes(item)} />
            )
          }
            )}
          </div>
        </div>
      

      
    </>
  )
}

export default HomePage