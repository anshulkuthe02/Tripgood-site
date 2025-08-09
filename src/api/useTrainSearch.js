import axios from 'axios';

const API_KEY = import.meta.env.VITE_TRAIN_API_KEY;
const API_HOST = import.meta.env.VITE_TRAIN_API_HOST;

export const searchTrainsBetweenStations = async (from, to) => {
  const options = {
    method: 'GET',
    url: `https://${API_HOST}/findtrains.php`,
    params: { from, to },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching train data:', error);
    throw error;
  }
};
