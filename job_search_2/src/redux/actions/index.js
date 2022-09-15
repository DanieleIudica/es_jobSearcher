export const ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE'
export const REMOVE_FROM_FAVOURITE = 'REMOVE_FROM_FAVOURITE'
export const GET_JOBS = 'GET_JOBS'
export const GET_JOBS_LOADING = 'GET_JOBS_LOADING'
export const GET_JOBS_ERROR = 'GET_JOBS_ERROR'

const baseEndpoint = 'https://strive-jobs-api.herokuapp.com/jobs?search='

export const addToFavouriteAction = (company) => ({
  type: ADD_TO_FAVOURITE,
  payload: company,
})

export const removeFromFavouriteAction = (company) => ({
  type: REMOVE_FROM_FAVOURITE,
  payload: company,
})

export const getJobsAction = (query) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_JOBS_LOADING,
        payload: true,
      })
      const response = await fetch(baseEndpoint + query + '&limit=20')
      if (response.ok) {
        const { data } = await response.json()
        dispatch({
          type: GET_JOBS,
          payload: data,
        })
        dispatch({
          type: GET_JOBS_LOADING,
          payload: false,
        })
      } else {
        dispatch({
          type: GET_JOBS_ERROR,
          payload: true,
        })
        dispatch({
          type: GET_JOBS_LOADING,
          payload: false,
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: GET_JOBS_ERROR,
        payload: true,
      })
      dispatch({
        type: GET_JOBS_LOADING,
        payload: false,
      })
    }
  }
}
