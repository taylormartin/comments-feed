import './App.css'
import { useRef, useState, useEffect } from 'react';
import useComments from './hooks/useComments'
import useCommenter from './hooks/useCommenter';
import { Comments } from './Comments';
import { Button, Textarea, Input } from '@chakra-ui/react';

function App() {
  const commentsRef = useRef();
  const [name, setName] = useState('');
  const [textValue, setTextValue] = useState();
  const { fetchData, comments, loading, error } = useComments();
  const { submitComment, loading: commentLoading, error: commentError } = useCommenter();

  useEffect(() => {
    scrollComments();
  }, [comments]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setTextValue(val);
  }

  const resetInputs = () => {
    setTextValue("");
    setName("");
  }

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
  }

  const handleSubmitComment = async () => {
    const ok = await submitComment(name, textValue);
    if (ok) {
      resetInputs();
      fetchData();
      scrollComments();
    }
  }

  const scrollComments = () => {
    const container = commentsRef.current;
    if (container) {
      container.scrollBy({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }

  return (
    <div className="app-container">
      {loading ? (<div>load it up</div>) : (
        <div className="card-container" ref={commentsRef}>
          <Comments comments={comments} />
        </div>
      )}
      <div className="comment-container">
        <Input aria-label="Name Input" className="name-input" placeholder='Name' value={name} onChange={handleNameChange} />
        <Textarea
          className="text-area"
          aria-label="Comment Input"
          value={textValue}
          onChange={handleTextChange}
          placeholder="I have a comment on that..."
          size='md'
        />
        <div className="button-container">
          <Button aria-label="Submit Comment" background-color="white" onClick={handleSubmitComment} colorScheme='blue'>Say It!</Button>
        </div>
      </div>
    </div>
  )
}

export default App
