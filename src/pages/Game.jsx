import * as React from "react";
import { range, shuffle } from "lodash";
import { colorsMap, shapesMap } from "./constants";
import cardImg from "../card.png";
import ChooseCardsCount from "./ChooseCardsCount";
import { generateShape, randomColor } from "./helper";

export default class Game extends React.Component {
  state = {
    cardsCount: 4
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
    this.setState(prevState => ({
      cards: prevState.cards.map(card =>
        index === card.index ? { ...card, flipped: !card.flipped } : card
      )
    }));

  render() {
    const { cards } = this.state;

    console.log({ cards });

    return !cards ? (
      <ChooseCardsCount
        onCountSelect={this.onCountSelect}
        onSubmit={this.onSubmit}
      />
    ) : null;
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
