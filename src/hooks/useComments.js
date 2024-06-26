import { useState, useEffect } from 'react';
import { GET_COMMENTS_URL } from '../constants';

const useComments = (toast) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(GET_COMMENTS_URL);
      const result = await response.json();
      setComments(result);
    } catch (error) {
      toast({
        title: 'Fetch comments failed',
        position: 'top-right',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, comments, loading };
};

export default useComments;
