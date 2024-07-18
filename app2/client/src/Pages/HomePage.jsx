import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar';
import { fetchMedia } from '../services/pixabayService';
import MediaItem from '../components/MediaItem';



const HomePage = () => {
  const [media, setMedia] = useState([]);
  const [query,setQuery] = useState('nature') //defualt is nature
  

  useEffect(()=> {
    const getMedia = async () => {
      try {
        const data = await fetchMedia(query)
        setMedia(data)
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    }
    getMedia();
  },[query])



  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
  }

 

  return (
    <>
      <Navbar/>
      <SearchBar onSearch={handleSearch}/>
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

export default HomePage