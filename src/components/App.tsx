import React from "react";
import Square from "./square/Square";
import './App.css';

interface AppState {
  squares: string[];
  nextValue: 'X' | 'O';
  hasToReset: boolean;
  status: string;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      nextValue: 'X',
      squares: Array(9).fill(''),
      hasToReset: false,
      status: 'Next player: X'
    }
  }

  calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  reset() {
    this.setState({
      nextValue: 'X',
      squares: Array(9).fill(''),
      hasToReset: false,
      status: 'Next player: X'
    });
  }

  handleClick(id: number) {
    if (this.state.squares[id]) {
      return;
    }

    if (this.state.hasToReset) {
      return;
    }

    const squares = this.state.squares;
    squares[id] = this.state.nextValue;

    const winner = this.calculateWinner(squares);


    const newNextValue = this.state.nextValue === 'X' ? 'O' : 'X';
    const newStatus = winner ? `Winner: ${winner}` : `Next player: ${newNextValue}`;

    this.setState({ squares, nextValue: newNextValue, status: newStatus, hasToReset: (!!winner || !squares.includes('')) });
  }

  renderSquare = (id: number) => {
    return (
      <Square value={this.state.squares[id]} onClick={() => this.handleClick(id)}/>
    )
  }

  render(): React.ReactNode {
    return (
      <div className="app">
        <div className="status">
          { this.state.status }
        </div>
        <div className="board">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        <div className="reset">
          {
            this.state.hasToReset ?
              <button onClick={() => this.reset()}>Recomeçar</button>
              : ''
          }
        </div>
      </div>
    )
  }
}