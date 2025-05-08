import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SaveView from './save/SaveView'
import saveLoader from './save/saveLoader'
import CharacterView from './save/character/CharacterView'

const router = createBrowserRouter([
  {
    path: '/ck3-explorer',
    element: <App />,
  },
  {
    path: '/ck3-explorer/save/:saveid',
    element: <SaveView />,
    loader: saveLoader,
    children: [
      {
        path: 'character/:id',
        element: <CharacterView />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
