import React from "react";
import './Square.css';

export interface ISquare {
  value: string;
  onClick(): void
};

export default class Square extends React.Component<ISquare> {
  render(): React.ReactNode {
    return (
      <div className="square" onClick={this.props.onClick}>
        {this.props.value}
      </div>
    )
  }
}