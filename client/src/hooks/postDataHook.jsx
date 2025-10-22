import axios from "axios";
import { useState } from "react";

const usePostData = () => {
  const [postProgress, setProgress] = useState(0);
  const [postError, setError] = useState("");

  async function postData(url, data) {
    try {
      setError("");
      setProgress(67);
      const response = await axios.post(url, data);
      setProgress(100);

      return response.data;
    } catch (err) {
      setProgress(0);
      setError(err.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  return [postData, postError, postProgress];
};
export default usePostData;
