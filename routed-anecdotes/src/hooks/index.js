import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const setChange = (value) => {
    setValue(value)
  }

  const reset = () => {
    setValue('')
  }
  
  return {
    type,
    value,
    onChange,
    setChange,
    reset
  }
}

// modules can have several named exports

export const useList = (initialValue=[]) => {
    const [values, setValues] = useState(initialValue)
    const setChange = (values) => {
        setValues(values)
    }
    return {
        values,
        setChange
      }
}