import { useState } from 'react';
import { POST_COMMENT_URL } from '../constants';

const useCommenter = (toast) => {
  const [loading, setLoading] = useState(false);

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
        toast({
          title: 'Comment save error',
          position: 'top-right',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
        setLoading(false);
      } finally {
        toast({
          title: 'Comment saved!',
          position: 'top-right',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        setLoading(false);
      }
  }

  return { submitComment, loading };
};

export default useCommenter;
