import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import Header from '../components/Header';

function Cart() {
  const { items } = useSelector(state => state.cart);

  return (
    <>
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
