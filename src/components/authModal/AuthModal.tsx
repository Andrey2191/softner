import React, { useRef, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './AuthModal.module.css';
import person from '../../assets/person.png'
import { AuthModalProps } from '../../features/types';


const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [showLogin, setShowLogin] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleForm = () => {
    setShowLogin((prev) => !prev);
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  const switchToLogin = () => {
    setShowLogin(true);
  };

  return (
    <div className={styles.modal} ref={modalRef} onClick={handleClickOutside}>
      <div className={styles.modalContent}>
        <div className={styles.modalPerson}>
          <img src={person} alt="person" />
        </div>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>{showLogin ? 'Войти в аккаунт' : 'Регистрация'}</span>
          <span className={styles.modalDescription}>{showLogin ? 'войдите в личный кабинет' : 'на портале недвижимости - Vigiland'}</span>
        </div>
        {showLogin ? <LoginForm onClose={onClose} /> : <RegisterForm switchToLogin={switchToLogin}/>}
        <div className={styles.modalFooter}>
          <span className={styles.footerDescription}>{showLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}</span>
          <button className={styles.modalSwitchBtn} onClick={toggleForm}>
            {showLogin ? 'Зарегистрироваться' : 'Войдите в личный кабинет'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;