import { useDispatch } from 'react-redux';

import { incrementQuantity, decrementQuantity } from '../redux/cartSlice';

function QuantityButtons({ id, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className="quantity-buttons-container">
      <button
        onClick={() => {
          dispatch(decrementQuantity(id));
        }}
        className="btn"
      >
        -
      </button>
      <p>{quantity}</p>
      <button
        onClick={() => {
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
