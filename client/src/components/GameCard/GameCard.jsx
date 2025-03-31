import './GameCard.scss';

const GameCard = ({ game }) => (
  <div className="game-card">
    <img src={game.background_image} alt={game.name} className="game-card__img" />
    <h3 className="game-card__title">{game.name}</h3>
    <p className="game-card__rating">⭐ {game.rating}</p>
  </div>
);

export default GameCard;
