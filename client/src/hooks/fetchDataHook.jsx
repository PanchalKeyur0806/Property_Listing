import axios from "axios";
import { useState } from "react";

const useFetchData = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function getData(url) {
    try {
      setError("");
      setProgress(67);
      const response = await axios.get(url);

      setProgress(100);
      return response.data.data;
    } catch (err) {
      setProgress(0);
      setError(err.response.data.message);
    }
  }

  return [getData, error, progress];
};
export default useFetchData;
