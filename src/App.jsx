import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchProducts } from './redux/productsSlice';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/cart', element: <Cart /> },
  { path: '/admin', element: <Admin /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> }
]);

function App() {
  const dispatch = useDispatch();
  dispatch(fetchProducts());

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
