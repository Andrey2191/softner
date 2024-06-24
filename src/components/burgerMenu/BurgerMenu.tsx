import React from 'react';
import styles from './BurgerMenu.module.css';
import personWhite from '../../assets/personwh.png';
import menuClose from '../../assets/close.png'
import { BurgerMenuProps } from '../../features/types';


const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, toggleMenu, handleAuthButtonClick }) => {
    return (
        <div className={`${styles.burgerMenu} ${isOpen ? styles.open : ''}`}>
            <button className={styles.closeButton} onClick={toggleMenu}>
                <img src={menuClose} alt="Close Menu" />
            </button>
            <nav className={styles.nav}>
                <a href="#about" className={styles.link} onClick={toggleMenu}>О проекте</a>
                <a href="#tokenomics" className={styles.link} onClick={toggleMenu}>Токеномика и NFT</a>
                <a href="#roadmap" className={styles.link} onClick={toggleMenu}>Roadmap</a>
                <a href="#documents" className={styles.link} onClick={toggleMenu}>Документы</a>
            </nav>
            <div className={styles.languageSelect}>
                <select className={styles.headerSelect} name="lang" defaultValue='ru'>
                    <option value="ru">RU</option>
                    <option value="eng">ENG</option>
                </select>
            </div>
            <button className={styles.authButton} onClick={() => { handleAuthButtonClick(); toggleMenu(); }}>
                <img src={personWhite} className="user" alt="user" />
                Войти в кабинет
            </button>
        </div>
    );
};

export default BurgerMenu;