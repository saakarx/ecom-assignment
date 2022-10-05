import { useDispatch } from 'react-redux';

import { addToCart, incrementQuantity } from '../redux/cartSlice';
import { incrementQuantityProduct } from '../redux/productsSlice';
import QuantityButtons from './QuantityButtons';

function ProductItem({ product, id, image, title, price, quantity }) {
  const dispatch = useDispatch();

  return (
    <article>
      <img src={image} draggable="false" />
      <div className="product-details">
        <h4 style={{ flex: 1 }}>{title}</h4>
        <h2>${price}</h2>
        {quantity < 1 ? (
          <button
            className="add-to-cart"
            onClick={() => {
              dispatch(incrementQuantityProduct(id));
              dispatch(addToCart(product));
            }}
          >
            Add to cart
          </button>
        ) : (
          <QuantityButtons id={id} quantity={quantity} />
        )}
      </div>
    </article>
  );
}

export default ProductItem;
