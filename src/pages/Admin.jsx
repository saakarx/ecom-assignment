import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import AdminProductItem from '../components/AdminProductItem';

function Admin() {
  const { products } = useSelector(state => state.products);

  return (
    <>
      <Navbar />
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
