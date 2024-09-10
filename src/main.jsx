import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SaveViewer from './save/SaveViewer'
import saveLoader from './save/saveLoader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>
  },
  {
    path: '/saves/:id',
    element: <SaveViewer></SaveViewer>,
    loader: saveLoader
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
