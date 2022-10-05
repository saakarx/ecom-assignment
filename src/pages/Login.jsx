import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { login } from '../utils/firebase';
import { loginUser } from '../redux/userSlice';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

function Login() {
  const [error, setError] = useState('');
  const { user } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(user).length !== 0) navigate('/');
  }, [user]);

  const handleSubmit = async values => {
    try {
      const user = await login(values.email, values.password);
      dispatch(loginUser(user));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Header heading="Login" />
      {error && <p className="error">{error}</p>}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Must be a valid email address')
            .required('Required'),
          password: Yup.string().required('Required')
        })}
        onSubmit={handleSubmit}
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
