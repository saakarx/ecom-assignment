import { useDispatch } from 'react-redux';

import { removeFromList } from '../redux/productsSlice';
import { removeItem } from '../redux/cartSlice';

function AdminProductItem({ id, price, title, image }) {
  const dispatch = useDispatch();

  return (
    <article>
      <img src={image} draggable="false" />
      <div className="product-details">
        <h4 style={{ flex: 1 }}>{title}</h4>
        <h2>${price}</h2>
        <button
          className="remove-item-btn"
          onClick={() => {
            dispatch(removeFromList(id));
            dispatch(removeItem(id));
          }}
        >
          Remove Item
        </button>
      </div>
    </article>
  );
}

export default AdminProductItem;
