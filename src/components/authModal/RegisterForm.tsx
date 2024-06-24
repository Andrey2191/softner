import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/authSlice';
import { AppDispatch, RootState } from '../../store';
import styles from './Form.module.css'
import { RegisterFormProps } from '../../features/types';


const RegisterForm: React.FC<RegisterFormProps> = ({ switchToLogin }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      Name: 'qwe',
      confirmPassword: '',
      language: 'EN_us',
      time_zone: 'GMT+0',
    },

    validate: (values) => {
      const errors: Partial<typeof values> = {};
      if (!values.email) {
        errors.email = 'Заполните поле';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Некорректный email';
      }
      if (!values.password) {
        errors.password = 'Заполните поле';
      } else if (values.password.length < 6) {
        errors.password = 'Пароль должен содержать не менее 6 знаков';
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Заполните поле';
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Пароли не совпадают';
      }
      return errors;
    },

    onSubmit: (values) => {
      dispatch(register(values))
        .unwrap()
        .then(() => {
          switchToLogin();
        });
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
        onBlur={formik.handleBlur}
        required
      />
      {formik.touched.email && formik.errors.email && (
        <div>{formik.errors.email}</div>
      )}

      <input
        type="password"
        id="password"
        name="password"
        placeholder='Придумайте пароль'
        className={styles.passwordInput}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
      />
      {formik.touched.password && formik.errors.password && (
        <div>{formik.errors.password}</div>
      )}

      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder='Повторите пароль'
        className={styles.passwordInput}
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <div>{formik.errors.confirmPassword}</div>
      )}
      <button className={styles.formBtn} type="submit" disabled={loading}>
        {loading ? 'Регистрация...' : 'Регистрация'}
      </button>
    </form>
  );
};

export default RegisterForm;