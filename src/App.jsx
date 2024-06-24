import './App.css'
import { useState } from 'react';
import useComments from './hooks/useComments'
import useCommenter from './hooks/useCommenter';
import { Comments } from './Comments';
import { Button, Textarea, Input } from '@chakra-ui/react';

function App() {
  const [textValue, setTextValue] = useState();
  const [name, setName] = useState(''); 
  const { fetchData, comments, loading, error } = useComments();
  const { submitComment, loading: commentLoading, error: commentError } = useCommenter();

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
    }
  }

  return (
    <>
      {loading ? (<div>load it up</div>) : (<Comments comments={comments} />)}
      <Input placeholder='Name' value={name} onChange={handleNameChange} />
      <Textarea
        value={textValue}
        onChange={handleTextChange}
        placeholder="I have a comment on that..."
        size='md'
      />
      <Button onClick={handleSubmitComment} colorScheme='blue'>Say It!</Button>
    </>
  )
}

export default App
