import './App.css'
import ListOfPosts from './post/components/ListOfPosts'
import FilterForPosts from './post/components/FilterForPost'
import CreateNewPost from './post/components/CreateNewPost'

function App() {

  return (
    <>
      <FilterForPosts />
      <hr />
      <ListOfPosts />
      <hr />
      <CreateNewPost />
    </>
  )
}

export default App
