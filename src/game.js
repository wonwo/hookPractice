import React, {useState} from "react";
import Board from "./board";

export default function Game(){

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);

    const winner = calculateWinner(history[stepNumber]);
    
    function handleClick(i) {
        const historyPts = history.slice(0,stepNumber + 1);
        const current = historyPts[stepNumber];
        const squares = current.slice();
        if (winner || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';

        setHistory([...historyPts, squares]);
        setStepNumber(historyPts.length);
        setXisNext(!xIsNext);
    }


    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
      };
    
    const renderMoves = () =>
        history.map((_step, move) => {
        const destination = move ? `Go to move #${move}` : "Go to Start";
        return (
        <li key={move}>
            <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={history[stepNumber]}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{renderMoves()}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
