import * as api from '../api'

export const EMAILAPI = () => async dispatch => {
  try {
    const { data } = await api.GetEmailAPI()
    return data
  } catch (error) {
    console.log(error)
  }
}
