import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductItem from '../components/ProductItem';

function Home() {
  const { quantity } = useSelector(state => state.cart);
  const { loading, error, products } = useSelector(state => state.products);

  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const filterProducts = () => {
    let filtered = [];
    filtered = [...products].filter(product => {
      if (minPrice && maxPrice)
        return product.price >= minPrice && product.price <= maxPrice;
      if (minPrice && !maxPrice) return product.price >= minPrice;
      if (maxPrice && !minPrice) return product.price <= maxPrice;
      else return true;
    });
    return filtered;
  };

  return (
    <>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '3rem'
        }}
      >
        <h1>Products</h1>
        <Link className="cart-btn" to="/cart">
          Cart {quantity}
        </Link>
      </header>
      <main>
        <div className="filter-container">
          <Formik
            initialValues={{ minPrice: '', maxPrice: '' }}
            onSubmit={values => {
              setMinPrice(Number(values.minPrice));
              setMaxPrice(Number(values.maxPrice));
            }}
          >
            <Form>
              <Field
                placeholder="Min Price"
                className="input"
                name="minPrice"
                type="number"
              />
              <Field
                placeholder="Max Price"
                className="input"
                name="maxPrice"
                type="number"
              />
              <button type="submit" className="filter-btn">
                Filter
              </button>
            </Form>
          </Formik>
        </div>
        <div className="products-container">
          {loading && <div>Loading...</div>}
          {!loading && error ? <div>{error}</div> : null}
          {!loading && products.length > 0
            ? filterProducts().map(product => (
                <ProductItem key={product.id} product={product} {...product} />
              ))
            : null}
        </div>
      </main>
    </>
  );
}

export default Home;
