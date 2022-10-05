import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminProductItem from '../components/AdminProductItem';
import Header from '../components/Header';

function Admin() {
  const { products } = useSelector(state => state.products);

  return (
    <>
      <Header heading="Admin" />
      <div className="products-container">
        {products.map(product => (
          <AdminProductItem key={product.id} {...product} />
        ))}
      </div>
    </>
  );
}

export default Admin;
