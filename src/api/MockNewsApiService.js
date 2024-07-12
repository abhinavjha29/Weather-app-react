import axios from "axios";

const MOCK_NEWS_URL = "http://localhost:6767/news";

export const fetchNews = async (category) => {
  try {
    const response = await axios.get(MOCK_NEWS_URL, {
      params: { category },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
