/*eslint-disable*/
/* eslint-disable space-before-function-paren */
import { useEffect, useReducer } from 'react'
import useAuth from 'context/auth'

function fetchReducer(state, action) {
  switch (action.type) {
    case 'fetch':
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null
      }
    case 'success':
      return { ...state, isLoading: false, data: action.payload }
    case 'error':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return { ...state }
  }
}

const INIT_STATE = { data: null, error: null, isLoading: true }

const useFetch = (key, func, reload, ...rest) => {
  const { setSession } = useAuth()
  const [state, dispatch] = useReducer(fetchReducer, INIT_STATE)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        dispatch({ type: 'fetch' })
        const dataFromStorage = JSON.parse(sessionStorage.getItem(key))
        if (mounted && dataFromStorage) {
          dispatch({ type: 'success', payload: dataFromStorage })
        } else {
          const res = await func(...rest)
          if (mounted) {
            sessionStorage.setItem(key, JSON.stringify(res.data))
            dispatch({ type: 'success', payload: res.data })
          }
        }
      } catch (error) {
        if (error) {
          if (error.status === 400) {
            dispatch({ type: 'error', payload: error.data.message })
          } else if (error.status === 401 || error.status === 403) {
            setSession(false)
          } else {
            dispatch({ type: 'error', payload: error.message })
          }
        } else {
          dispatch({ type: 'error', payload: 'Network connection error' })
        }
      }
    })()

    return () => (mounted = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, func, reload, setSession])

  return state
}

export default useFetch
