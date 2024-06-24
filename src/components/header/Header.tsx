import React, { useState, useEffect  } from 'react';
import styles from './Header.module.css';
import logo from '../../assets/logo.png'
import person from '../../assets/person.png'
import chevron from '../../assets/chevron.png'
import menu from '../../assets/menu.png'
import AuthModal from '../authModal/AuthModal';
import BurgerMenu from '../burgerMenu/BurgerMenu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getProfile } from '../../features/authSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.id !== null);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleAuthButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <button className={styles.burgerButton} onClick={toggleMenu}>
        <img src={menu} alt="Menu Icon" />
      </button>
      <BurgerMenu
        isOpen={menuOpen}
        toggleMenu={toggleMenu}
        handleAuthButtonClick={handleAuthButtonClick}
      />
      <div className={styles.headerLeft}>
        <img src={logo} alt="logo" className={styles.logo} />
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <a href="#about" className={styles.link}>О проекте</a>
          <a href="#tokenomics" className={styles.link}>Токеномика и NFT</a>
          <a href="#roadmap" className={styles.link}>Roadmap</a>
          <a href="#documents" className={styles.link}>Документы</a>
        </nav>
      </div>
      <div className={styles.headerRight}>
      {isAuthenticated ? (
          <button className={styles.authButton}>
            Открыть платформу
            <img src={chevron} className={styles.chevron} alt="chevron"/>
          </button>
        ) : (
          <button className={styles.authButton} onClick={handleAuthButtonClick}>
            <img src={person} className={styles.user} alt="user"/>
            Вход
            <div className={styles.line}></div>
            Регистрация
          </button>
        )}
        <div className={styles.verticalLine}></div>
        <div className={styles.languageSelect}>
          <select className={styles.headerSelect} name="lang" defaultValue="ru">
            <option value="ru">RU</option>
            <option value="eng">ENG</option>
          </select>
        </div>
      </div>
      {isModalOpen && <AuthModal onClose={handleCloseModal} />}
    </header>
  );
};

export default Header;