import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import store from './store.js/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter ,  RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element :<App/>,
    children :[

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
