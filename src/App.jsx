import React from 'react';
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';
import { AppRouter } from './routers/AppRouter.jsx';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
      />
      </PersistGate>
    </Provider>
  )
}