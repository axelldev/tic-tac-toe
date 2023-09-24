import { TURNS, initialSelections } from '../constants/turns'

export const BOARD_KEY = 'board'
export const WINNER_KEY = 'winner'
export const SELECTIONS_KEY = 'selections'
export const TURN_KEY = 'turn'

/**
Stringify and saves the item to the local storage.
*/
const setItem = (key, item) => {
  const parsed = JSON.stringify(item)
  window.localStorage.setItem(key, parsed)
}

/**
Parses and returns an item from the local storage.
*/
const getItem = (key) => {
  const item = window.localStorage.getItem(key)
  if (!item) return null
  return JSON.parse(item)
}

export const saveBoard = (board) => {
  setItem(BOARD_KEY, board)
}

export const getBoard = () => {
  const board = getItem(BOARD_KEY)
  return board ? board : Array(9).fill(null)
}

export const setBoard = (board) => {
  setItem(BOARD_KEY, board)
}

export const setWinner = (winner) => {
  setItem(WINNER_KEY, winner)
}

export const getWinner = () => {
  return getItem(WINNER_KEY)
}

export const getTurn = () => {
  const turn = getItem(TURN_KEY)
  return turn ? turn : TURNS.X
}

export const setTurn = (turn) => {
  setItem(TURN_KEY, turn)
}

export const getSelections = () => {
  const selections = getItem(SELECTIONS_KEY)
  return selections ? selections : initialSelections()
}

export const setSelections = (selections) => {
  setItem(SELECTIONS_KEY, selections)
}

export const resetGameStorage = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
  setSelections(initialSelections())
}
