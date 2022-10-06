import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { fetchProducts } from './redux/productsSlice';
import { updateLoginUser } from './redux/userSlice';
import { searchCart } from './utils/firebase';
import { initCart } from './redux/cartSlice';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/cart', element: <Cart /> },
  { path: '/admin', element: <Admin /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> }
]);

function App() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(user).length <= 0) dispatch(updateLoginUser());
    else {
      dispatch(fetchProducts());
      (async function () {
        const cart = await searchCart(user.id);
        dispatch(initCart(cart));
      })();
    }
  }, [user]);

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
