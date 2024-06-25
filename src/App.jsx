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
    <>
      {loading ? (<div>load it up</div>) : (
        <div className="card-container" ref={commentsRef}>
          <Comments comments={comments} />
        </div>
      )}
      <Input placeholder='Name' value={name} onChange={handleNameChange} />
      <Textarea
        value={textValue}
        onChange={handleTextChange}
        placeholder="I have a comment on that..."
        size='md'
      />
      <Button onClick={handleSubmitComment} colorScheme='blue'>Say It!</Button>
      <Button onClick={scrollComments} colorScheme='blue'>Scroll It</Button>
    </>
  )
}

export default App
