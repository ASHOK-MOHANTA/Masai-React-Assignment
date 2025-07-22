
import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { FeedbackProvider } from './context/FeedbackContext'
import FeedbackForm from './components/FeedbackForm'
import Summary from './components/Summary'

const App: React.FC = ()=> {

  return (
    <FeedbackProvider>
      
        <Routes>
        <Route path='/' element={<FeedbackForm/>} />
        <Route path='summary' element={<Summary/>}/>
        </Routes>
      
    </FeedbackProvider>
  )
}

export default App
