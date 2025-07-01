import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState(null); // 'human' or 'ai'

  useEffect(() => {
    if (gameMode === 'ai' && !xIsNext && !calculateWinner(board) && board.includes(null)) {
      const aiMove = getAIMove(board);
      if (aiMove !== null) {
        setTimeout(() => handleClick(aiMove), 500); // Delay AI move for better UX
      }
    }
  }, [board, xIsNext, gameMode]);

  const handleClick = (i) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[i]) {
      return;
    }
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const getAIMove = (currentBoard) => {
    const availableMoves = currentBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    
    // Prioritize winning moves
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      const tempBoard = [...currentBoard];
      tempBoard[move] = 'O'; // AI is 'O'
      if (calculateWinner(tempBoard) === 'O') {
        return move;
      }
    }

    // Block opponent's winning moves
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      const tempBoard = [...currentBoard];
      tempBoard[move] = 'X'; // Opponent is 'X'
      if (calculateWinner(tempBoard) === 'X') {
        return move;
      }
    }

    // Take center if available
    if (availableMoves.includes(4)) {
      return 4;
    }

    // Take corners if available
    const corners = [0, 2, 6, 8];
    for (let i = 0; i < corners.length; i++) {
      const corner = corners[i];
      if (availableMoves.includes(corner)) {
        return corner;
      }
    }

    // Take any available move
    if (availableMoves.length > 0) {
      return availableMoves[0];
    }

    return null;
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (board.every(square => square !== null)) {
    status = 'Draw!';
  }
  else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const chooseGameMode = (mode) => {
    setGameMode(mode);
    handleRestart();
  };

  if (!gameMode) {
    return (
      <div className="game-mode-selection">
        <h1>Choose Game Mode</h1>
        <button onClick={() => chooseGameMode('human')}>Play with a Friend</button>
        <button onClick={() => chooseGameMode('ai')}>Play with Me (AI)</button>
      </div>
    );
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="restart-button" onClick={handleRestart}>Restart Game</button>
        <button className="change-mode-button" onClick={() => chooseGameMode(null)}>Change Game Mode</button>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
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
};

export default App;