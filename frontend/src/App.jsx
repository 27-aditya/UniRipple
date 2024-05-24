import { useState } from 'react'
import Header from './header'
import PostForm from './postform'
import Thread from './thread'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <PostForm/>
      <Thread 
        title="Sample Thread Title" 
        content="This is a sample thread content. Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
        upvotes={10}
        onUpvote={() => console.log('Upvoted')} 
        onComment={() => console.log('Commented')} 
      />

    </>
  )
}

export default App
