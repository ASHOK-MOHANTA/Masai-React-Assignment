import { useState } from 'react'
import './App.css'
import ChatButton from './Chatbot/ChatButton'
import ChatWindow from './Chatbot/ChatWindow'

function App() {
  const [isChatOpen, setisChatOpen] = useState(false)

  return (
    <>
      <ChatButton isOpen={isChatOpen} onClick={()=> setisChatOpen(!isChatOpen)} />
      <ChatWindow isOpen={isChatOpen} onClick={()=> setisChatOpen(false)} />
    </>
  )
}

export default App
