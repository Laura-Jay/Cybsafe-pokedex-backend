import axios from "axios";

export const fetchLocationData = async (url: string) => {
    const response = await axios.get(url)
    const data = response.data;
    console.log(data)
    return data
  }