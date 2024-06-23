import './App.css'
import useComments from './hook'

function App() {
  const { comments, loading, error } = useComments();

  return (
    <>
      {loading ? (<div>load it up</div>) : (<div>{comments[0].message}</div>)}
    </>
  )
}

export default App
