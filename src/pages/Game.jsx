import * as React from "react";
import styled from "styled-components";
import { range, shuffle } from "lodash";
import { parse } from "qs";
import {
  CANVAS_ID,
  componentsMap,
  CONGRATULATIONS_AUDIO_ID
} from "./constants";
import {
  generateConfetti,
  generateShape,
  randomCongratulationsAudio
} from "./helper";
import cardImg from "../images/card.png";

const FlipContainer = styled.div`
  @media (min-width: 576px) {
    width: 15%;
    height: 30%;
    perspective: 1000px;
    margin-right: ${props => ((props.index + 1) % 5 === 0 ? 0 : "6%")};
  }

  @media (max-width: 576px) {
    width: 20%;
    height: 20%;
    perspective: 1000px;
    margin-right: ${props => ((props.index + 1) % 4 === 0 ? 0 : "6%")};
  }
`;

let ID = 0;

export default class Game extends React.Component {
  generateCards = cardsCount => {
    const cards = [];
    const pairsCount = cardsCount / 2;

    range(0, pairsCount).forEach(() => {
      const id = ID++;
      const card = this.generateCard(id);
      const duplicate = { ...card, id: ID++ };
      cards.push(card);
      cards.push(duplicate);
    });

    return shuffle(cards);
  };

  generateCard = id => {
    const shape = generateShape(id / 2);

    return {
      id,
      flipped: true,
      ...shape
    };
  };

  state = {
    cardsCount: 6,
    cards: this.generateCards(6),
    selectedCards: [],
    up: 0
  };

  flipCard = id =>
    this.setState(prevState => {
      const { cards, selectedCards } = prevState;

      const card = cards.find(card => id === card.id);

      if (card.flipped && selectedCards.length < 2) {
        return {
          cards: cards.map(card =>
            id === card.id ? { ...card, flipped: false } : card
          ),
          selectedCards: [...selectedCards, card]
        };
      }
    });

  compareCards = (card1, card2) => {
    const { color: color1, shape: shape1, id: id1 } = card1;
    const { color: color2, shape: shape2, id: id2 } = card2;

    setTimeout(() => {
      if (shape1 !== shape2 || color1 !== color2) {
        this.setState(prevState => ({
          cards: prevState.cards.map(card =>
            card.id === id1 || card.id === id2
              ? { ...card, flipped: true }
              : card
          ),
          selectedCards: []
        }));
      } else {
        this.setState(prevState => ({
          selectedCards: [],
          up: prevState.up + 2
        }));
      }
    }, 750);
  };

  nextLevel = () => {
    const { cardsCount } = this.state;

    if (cardsCount < 12) {
      this.setState(prevState => {
        const cardsCount = prevState.cardsCount + 2;

        return {
          cardsCount,
          cards: this.generateCards(cardsCount),
          up: 0
        };
      });
    } else {
      this.props.history.push("/ending");
    }
  };

  isLevelFinished = () => {
    const { cardsCount, up } = this.state;

    return cardsCount === up;
  };

  playAudio = elementId => document.getElementById(elementId).play();

  componentDidMount() {
    this.props.history.replace("/play");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.isLevelFinished()) {
      const confetti = generateConfetti();
      confetti.render();

      setTimeout(() => {
        confetti.clear();
        this.nextLevel();
      }, 3000);

      this.playAudio(CONGRATULATIONS_AUDIO_ID);
    } else {
      const { history, location } = this.props;

      const queryStringObj = parse(location.search, {
        ignoreQueryPrefix: true
      });

      if (queryStringObj.reset) {
        history.replace("/play");

        this.setState({
          cardsCount: 6,
          cards: this.generateCards(6),
          selectedCards: [],
          up: 0
        });
      }
    }
  }

  render() {
    const { cards, cardsCount, selectedCards } = this.state;

    if (selectedCards.length === 2) {
      this.compareCards(...selectedCards);
    }

    const level = (cardsCount - 6) / 2 + 1;
    const levelFinished = this.isLevelFinished();
    const progressBarWidth = 25 * (levelFinished ? level : level - 1);

    const congratulationsAudio = randomCongratulationsAudio();

    return (
      <div className="row">
        <canvas id={CANVAS_ID} className="canvas full-height"></canvas>
        <audio id={CONGRATULATIONS_AUDIO_ID} src={congratulationsAudio}></audio>
        <div className="col-1" />
        <div className="col-10">
          <div className="full-height">
            <div className="pt-3 mb-4">
              <div className="progress">
                <div
                  className={`progress-bar bg-success w-${progressBarWidth}`}
                />
              </div>
            </div>
            <div className="d-flex flex-wrap cards-container">
              {cards.map((card, index) => {
                const ShapeComponent = componentsMap[card.shape];
                const isFlipped = card.flipped;

                return (
                  <FlipContainer
                    key={card.id}
                    className={`${!isFlipped ? "face-up" : ""}`}
                    index={index}
                    onClick={() => this.flipCard(card.id)}
                  >
                    <div className={`flipper ${!isFlipped ? "face-up" : ""}`}>
                      <div className="front">
                        <img className="w-100 h-100" src={cardImg} />
                      </div>
                      <div className="back">
                        <ShapeComponent fill={card.color} />
                      </div>
                    </div>
                  </FlipContainer>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    );
  }
}
