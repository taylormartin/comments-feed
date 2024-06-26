import { useState, useEffect } from 'react';
import { POST_COMMENT_URL } from '../constants';

const useCommenter = (toast) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const submitComment = async (name, text) => {
    setLoading(true);
    try {
        const response = await fetch(POST_COMMENT_URL, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: name, message: text}),
          });
        return response.ok;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
  }

  return { submitComment, loading, error };
};

export default useCommenter;
