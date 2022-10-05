import { useDispatch } from 'react-redux';

import { incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import {
  decrementQuantityProduct,
  incrementQuantityProduct
} from '../redux/productsSlice';

function QuantityButtons({ id, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className="quantity-buttons-container">
      <button
        onClick={() => {
          dispatch(decrementQuantityProduct(id));
          dispatch(decrementQuantity(id));
        }}
        className="btn"
      >
        -
      </button>
      <p>{quantity}</p>
      <button
        onClick={() => {
          dispatch(incrementQuantityProduct(id));
          dispatch(incrementQuantity(id));
        }}
        className="btn"
      >
        +
      </button>
    </div>
  );
}

export default QuantityButtons;
