import * as React from "react";
import { range } from "lodash";

export default class ChooseCardsCount extends React.Component {
  render() {
    const { onCountSelect, onSubmit } = this.props;
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div>
          <h2>Избери број на карти:</h2>
          <select onChange={onCountSelect} className="form-control">
            {range(4, 11, 2).map(item => (
              <option key={item} className="text-center" value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="text-center mt-5">
            <button className="btn btn-primary btn-block" onClick={onSubmit}>
              Старт
            </button>
          </div>
        </div>
      </div>
    );
  }
}
