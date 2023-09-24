import { useState } from 'react'
import Board from './components/Board'
import Game from './components/Game'
import Square from './components/Square'
import TurnSection from './components/TurnSection'
import { TURNS, WINNER_COMBOS } from './constants/turns'
import {
  getBoard,
  setBoard as setBoardStorage,
  getWinner,
  setWinner as setWinnerStorage,
  getSelections,
  setSelections as setSelectionsStorage,
  getTurn,
  setTurn as setTurnStorage,
  resetGameStorage,
} from './utils/gameStorage'
import WinnerModal from './components/WinnerModal'
import confetti from 'canvas-confetti'

function App() {
  const [board, setBoard] = useState(getBoard())
  const [turn, setTurn] = useState(getTurn())
  const [winner, setWinner] = useState(getWinner())
  const [selections, setSelections] = useState(getSelections())

  const resetGame = () => {
    resetGameStorage()
    setBoard(getBoard())
    setTurn(getTurn())
    setSelections(getSelections())
    setWinner(getWinner())
  }

  const checkWinner = () => {
    for (const [turn, values] of Object.entries(selections)) {
      for (const combo of WINNER_COMBOS) {
        const result = combo.every((i) => values.includes(i))
        if (result) {
          setWinner(turn)
          setWinnerStorage(turn)
          confetti()
          return
        }
      }
    }
  }

  const checkEndGame = (board) => {
    if (board.includes(null)) return
    setWinner('tie')
    setWinnerStorage('tie')
  }

  const updateBoard = (index) => {
    // If the cell is not empty then exit the function
    if (board[index] || winner) return

    const newSelections = { ...selections }
    newSelections[turn].push(index)
    setSelections(newSelections)
    setSelectionsStorage(newSelections)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    setTurnStorage(newTurn)

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    setBoardStorage(newBoard)
    return newBoard
  }

  return (
    <Board>
      <Game>
        {board.map((turn, index) => (
          <Square
            key={index}
            index={index}
            updateBoard={() => {
              const newBoard = updateBoard(index)
              checkWinner()
              if (newBoard) checkEndGame(newBoard)
            }}
          >
            {turn}
          </Square>
        ))}
      </Game>
      <TurnSection turn={turn} />
      {winner !== null && (
        <WinnerModal className="winner" resetGame={resetGame}>
          {winner && <Square isSelected>{winner}</Square>}
        </WinnerModal>
      )}
    </Board>
  )
}

export default App
