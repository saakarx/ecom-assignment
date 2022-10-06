import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CartItem from '../components/CartItem';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { updateCartItem } from '../utils/firebase';

function Cart() {
  const { user } = useSelector(state => state.user);
  const { quantity, items, cartId } = useSelector(state => state.cart);

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) navigate('/login');
  }, [user]);

  useMemo(() => {
    if (!cartId) return;
    updateCartItem(cartId, { quantity, items });
  }, [items, cartId]);

  return (
    <>
      <Navbar />
      <Header heading="Cart" />
      <div className="cart-item-container">
        {items.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}

export default Cart;
