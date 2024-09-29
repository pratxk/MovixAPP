import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <ChakraProvider>
      <App />
    </ChakraProvider>
)
