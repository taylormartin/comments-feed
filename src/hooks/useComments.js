import { useState, useEffect } from 'react';
import { GET_COMMENTS_URL } from '../constants';

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      // debugger;
      const response = await fetch(GET_COMMENTS_URL);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      const result = await response.json();
      setComments(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, comments, loading, error };
};

export default useComments;
