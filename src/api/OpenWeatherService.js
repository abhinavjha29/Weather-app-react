import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:6767/api',
});

export async function fetchWeatherData(lat, lon) {
  try {
    const response = await axiosInstance.get('/weather', {
      params: {
        lat,
        lon,
      },
    });

    console.log(response.data);
    return [response.data.weather, response.data.forecast];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCities(input) {
  try {
    const response = await axiosInstance.get('/cities', {
      params: {
        namePrefix: input,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
