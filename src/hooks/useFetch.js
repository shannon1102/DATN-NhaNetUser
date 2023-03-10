import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url,opts) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url,opts);
        console.log("Response UseFetch",res);
        setData(res.data.result);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async (opts) => {
    setLoading(true);
    try {
      const res = await axios.get(url,opts);
      setData(res.data.result);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
