import './App.css'
import useComments from './hook'
import { Comments } from './Comments';

function App() {
  const { comments, loading, error } = useComments();

  return (
    <>
      {loading ? (<div>load it up</div>) : (<Comments comments={comments} />)}
    </>
  )
}

export default App