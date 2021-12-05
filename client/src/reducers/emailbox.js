import { OPEN_EMAIL_BOX, CLOSE_EMAIL_BOX } from '../constants/actionTypes'

const emailboxReducer = (state = { Open: false }, action) => {
  switch (action.type) {
    case OPEN_EMAIL_BOX:
      return { ...state, Open: true }

    case CLOSE_EMAIL_BOX:
      return { ...state, Open: false }

    default:
      return state
  }
}

export default emailboxReducer
