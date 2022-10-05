import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/userSlice';

function Navbar() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      {Object.keys(user).length === 0 && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      <Link to="/admin">Admin</Link>
      {Object.keys(user).length !== 0 && (
        <button className="logout-btn" onClick={() => dispatch(logoutUser())}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
