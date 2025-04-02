import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.body).render(
  <Router>
    <App />
  </Router>,
)
