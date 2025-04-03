import GameList from '../GameList/GameList';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero__overlay">
          <h1 className="hero__title">🎮 Welcome to PixelPlay</h1>
          <p className="hero__tagline">Discover & collect your favorite games!</p>
          <a href="#games" className="hero__cta">
            Start Exploring
          </a>
        </div>
      </section>

      <div id="games">
        <GameList />
      </div>
    </div>
  );
};

export default HomePage;
