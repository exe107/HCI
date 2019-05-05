import * as React from "react";
import { range, shuffle } from "lodash";
import { componentsMap } from "./constants";
import cardImg from "../card.png";
import ChooseCardsCount from "./ChooseCardsCount";
import { generateShape } from "./helper";

export default class Game extends React.Component {
  state = {
    cardsCount: 4,
    selectedCards: []
  };

  onCountSelect = event => this.setState({ cardsCount: event.target.value });

  onSubmit = () =>
    this.setState(prevState => {
      const cards = [];
      const pairsCount = prevState.cardsCount / 2;

      range(0, pairsCount).forEach(index => {
        const card = this.generateCard(index);
        const duplicate = { ...card, index: pairsCount + index };
        cards.push(card);
        cards.push(duplicate);
      });

      return { cards: shuffle(cards) };
    });

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
        this.setState({ selectedCards: [] });
      }
    }, 750);
  };

  render() {
    const { cards, selectedCards } = this.state;

    if (selectedCards.length === 2) {
      this.compareCards(...selectedCards);
    }

    return !cards ? (
      <ChooseCardsCount
        onCountSelect={this.onCountSelect}
        onSubmit={this.onSubmit}
      />
    ) : (
      <div className="row">
        <div className="col-1" />
        <div className="col-10">
          <div className="d-flex">
            <div className="d-flex full-height flex-wrap align-items-center justify-content-between w-100">
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
          </div>
        </div>
        <div className="col-1" />
      </div>
    );
  }

  generateCard = index => {
    const shape = generateShape(index);

    return {
      index,
      flipped: true,
      ...shape
    };
  };
}
