import * as React from "react";
import { range, shuffle } from "lodash";
import { parse } from "qs";
import { componentsMap } from "./constants";
import cardImg from "../card.png";
import { generateShape } from "./helper";

export default class Game extends React.Component {
  componentDidMount() {
    this.props.history.replace("/play");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { history, location } = this.props;

    const queryStringObj = parse(location.search, {
      ignoreQueryPrefix: true
    });

    if (queryStringObj.reset) {
      history.replace("/play");

      this.setState({
        cardsCount: 6,
        cards: this.generateCards(6, 0),
        selectedCards: [],
        up: 0,
        counter: 0
      });
    }
  }

  generateCards = (cardsCount, counter) => {
    const cards = [];
    const pairsCount = cardsCount / 2;

    range(0, pairsCount).forEach(index => {
      const card = this.generateCard(counter + index);
      const duplicate = { ...card, index: counter + index + pairsCount };
      cards.push(card);
      cards.push(duplicate);
    });

    return shuffle(cards);
  };

  generateCard = index => {
    const shape = generateShape(index);

    return {
      index,
      flipped: true,
      ...shape
    };
  };

  state = {
    cardsCount: 6,
    cards: this.generateCards(6, 0),
    selectedCards: [],
    up: 0,
    counter: 0
  };

  flipCard = index =>
    this.setState(prevState => {
      const { cards, selectedCards } = prevState;

      const card = cards.find(card => index === card.index);

      if (card.flipped && selectedCards.length < 2) {
        return {
          cards: cards.map(card =>
            index === card.index ? { ...card, flipped: false } : card
          ),
          selectedCards: [...selectedCards, card]
        };
      }
    });

  compareCards = (card1, card2) => {
    const { color: color1, shape: shape1, index: index1 } = card1;
    const { color: color2, shape: shape2, index: index2 } = card2;

    setTimeout(() => {
      if (shape1 !== shape2 || color1 !== color2) {
        this.setState(prevState => ({
          cards: prevState.cards.map(card =>
            card.index === index1 || card.index === index2
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
        const counter = prevState.counter + cardsCount;

        return {
          cardsCount,
          cards: this.generateCards(cardsCount, counter),
          up: 0,
          counter
        };
      });
    } else {
      this.props.history.push("/ending");
    }
  };

  render() {
    const { cards, cardsCount, selectedCards, up } = this.state;

    if (selectedCards.length === 2) {
      this.compareCards(...selectedCards);
    }

    const level = (cardsCount - 6) / 2 + 1;
    const finished = up === cardsCount;
    const progressBarWidth = 25 * (finished ? level : level - 1);

    return (
      <div className="row">
        <div className="col-1" />
        <div className="col-10">
          <div className="full-height">
            <div className="d-flex align-items-center justify-content-center responsive-text h-15">
              Ниво {level}
              {finished && <i className="fa fa-check text-success ml-1" />}
            </div>
            <div className="d-flex flex-wrap justify-content-between w-100 h-80">
              {cards.map(card => {
                const ShapeComponent = componentsMap[card.shape];
                const isFlipped = card.flipped;

                return (
                  <div
                    key={card.index}
                    className={`flip-container ${!isFlipped ? "face-up" : ""}`}
                    onClick={() => this.flipCard(card.index)}
                  >
                    <div className={`flipper ${!isFlipped ? "face-up" : ""}`}>
                      <div className="front">
                        <img className="w-100 h-100" src={cardImg} />
                      </div>
                      <div className="back">
                        <ShapeComponent fill={card.color} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="progress h-3">
                <div
                  className={`progress-bar bg-success w-${progressBarWidth}`}
                />

            </div>
          </div>
        </div>
        <div className="col-1">
          {finished && (
            <div className="d-flex justify-content-center align-items-center h-100">
              <button className="btn" onClick={this.nextLevel}>
                <i className="fa fa-arrow-circle-right np" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
