import { useDispatch } from 'react-redux';

import { addToCart } from '../redux/cartSlice';

function ProductItem({ product, image, title, price }) {
  const dispatch = useDispatch();

  return (
    <article>
      <img src={image} draggable="false" />
      <div className="product-details">
        <h4 style={{ flex: 1 }}>{title}</h4>
        <h2>${price}</h2>
        <button
          className="add-to-cart"
          onClick={() => {
            dispatch(addToCart(product));
          }}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductItem;
