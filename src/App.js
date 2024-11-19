import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes/UserRoutes';
import { Provider } from 'react-redux';
import { storeReduce } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  const {store, persistor} = storeReduce();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Routes>
        <Route exact path="/*" element={<UserRoutes/>} />
      </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
