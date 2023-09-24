import { TURNS } from './turns'

export const intialSelections = () => {
  const selections = {
    [TURNS.X]: [],
    [TURNS.O]: [],
  }

  const previousSelections = window.localStorage.getItem('selections')
  return previousSelections ? JSON.parse(previousSelections) : selections
}

export const initialBoard = () => {
  const board = window.localStorage.getItem('board')
  return board ? JSON.parse(board) : Array(9).fill(null)
}
