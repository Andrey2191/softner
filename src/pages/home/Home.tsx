import React from 'react';
import styles from './Home.module.css';
import player from '../../assets/player.png'

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <main className={styles.homeMain}>
        <h3>NFT ПРОЕКТ</h3>
        <h1>Будущее инвестиций <br/> в недвижимость</h1>
        <span className={styles.homeDescription}>Мы делаем инвестиции в недвижимость в Европе <br/> безопасными, прозрачными и доступными для всех.</span>
      </main>
      <div className={styles.homeBtns}>
        <button className={styles.homeByuBtn}>Купить недвижимость</button>
        <button className={styles.homePlayBtn}>
          <img src={player} alt="player" />
          <span>КАК ЭТО РАБОТАЕТ?</span>
        </button>
      </div>
    </div>
  );
};

export default Home;