import axios from 'axios'


const pixaBayKey = process.env.REACT_APP_PIXABAY_API_KEY || 'REDACTED_PIXABAY_KEY'

const photoURL = 'https://pixabay.com/api/'
const VideoURL = 'https://pixabay.com/api/videos/'


const fisherYatesShuffle = (arr) => {
  for (let i = arr.length-1; i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]]
  }
  return arr;
}


export const fetchMedia = async (query) => {
  try {
    const resPhoto = await axios.get(photoURL, {
      params: {
        key: pixaBayKey,
        q: query,
        
      }
    })
    const resVideo = await axios.get(VideoURL, {
      params: {
        key: pixaBayKey,
        q: query,
      }
    })


    const images = resPhoto.data.hits.map((hit) => ({ ...hit, type: 'image' }));
    const videos = resVideo.data.hits.map((hit) => ({ ...hit, type: 'video' }));


    let data = [...images,...videos];
    for(let i =0;i<5;i++){
      const shuffledData = fisherYatesShuffle(data) 
      data = fisherYatesShuffle(shuffledData);
    }
    console.log(data.length)
    return data
  } catch (error) {
    console.error('Error fetching media from Pixabay:', error);
    throw error;
  }
}