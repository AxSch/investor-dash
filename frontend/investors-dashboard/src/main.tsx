import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistedStore } from './store/store';
import { Provider } from 'react-redux'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <App />
          </PersistGate>
      </Provider>
  </React.StrictMode>,
)
