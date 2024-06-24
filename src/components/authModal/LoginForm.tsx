import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/authSlice';
import { AppDispatch, RootState } from '../../store';
import { AuthModalProps, LoginData } from '../../features/types';
import styles from './Form.module.css'

const LoginForm: React.FC<AuthModalProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    onSubmit: (values: LoginData) => {
      dispatch(login(values));
      onClose()
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <input
        type="email"
        id="email"
        name="email"
        placeholder='Введите ваш email'
        className={styles.emailInput}
        value={formik.values.email}
        onChange={formik.handleChange}
        required
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder='Пароль'
        className={styles.passwordInput}
        value={formik.values.password}
        onChange={formik.handleChange}
        required
      />
      <button className={styles.formBtn} type="submit" disabled={loading}>
        {loading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};

export default LoginForm;