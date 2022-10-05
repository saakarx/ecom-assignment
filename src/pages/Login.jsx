import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { getUser } from '../utils/firebase';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

function Login() {
  const fetchUser = () => {
    getUser('saakarg615@gmail.com');
  };

  return (
    <>
      <Navbar />
      <Header heading="Login" />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Must be a valid email address')
            .required('Required'),
          password: Yup.string().required('Required')
        })}
      >
        <Form>
          <div className="input-control">
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" placeholder="Email Address" />
            <p>
              <ErrorMessage name="email" />
            </p>
          </div>

          <div className="input-control">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" placeholder="Password" />
            <p>
              <ErrorMessage name="password" />
            </p>
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default Login;
