import axios from "axios"

const MOCK_NEWS_URL = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=8928c9f972af4816a02b2458eb12571c'

export const fetchNews =async ()=>{
try {
    const response = await axios.get(MOCK_NEWS_URL);
  console.log(response)
    return response.data
} catch (error) {
    console.log(error)
}
}