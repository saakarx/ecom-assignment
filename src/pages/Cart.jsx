import { useSelector } from 'react-redux';

import CartItem from '../components/CartItem';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

function Cart() {
  const { items } = useSelector(state => state.cart);

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
