import React from 'react'
import ReactDOM from 'react-dom/client'
import {MainSection} from './MainSection.jsx'
import { Skills } from './Skills.jsx'
import Form from './Form.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainSection/>
    <Skills/>
    <Form />
  </React.StrictMode>,
)
