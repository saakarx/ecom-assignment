import { useDispatch } from 'react-redux';

import { removeItem } from '../redux/cartSlice';
import { removeItemProduct } from '../redux/productsSlice';
import QuantityButtons from './QuantityButtons';

function CartItem({ id, image, title, price, quantity }) {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <img src={image} draggable="false" />
      <div style={{ marginLeft: '1.6rem', marginTop: '1.6rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>{title}</h4>
        <h2>${price}</h2>
      </div>
      <div style={{ marginTop: '1.6rem', marginRight: '1.6rem' }}>
        <QuantityButtons id={id} quantity={quantity} />
        <button
          onClick={() => {
            dispatch(removeItemProduct(id));
            dispatch(removeItem(id));
          }}
          className="remove-item-btn"
        >
          Remove Item
        </button>
      </div>
    </article>
  );
}

export default CartItem;
