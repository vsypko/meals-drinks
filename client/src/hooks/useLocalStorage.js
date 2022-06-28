import { useState } from 'react'

export const useLocalStorage = (key, initialValue = '') => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue
  })

  const setStoredValue = (value) => {
    setValue(value)
    localStorage.setItem(key, value)
  }

  // useEffect(() => {
  //   localStorage.setItem(key, value)
  // }, [key, value])

  return [value, setStoredValue]
}
