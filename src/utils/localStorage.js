const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getItem = (key) => {
  const value = localStorage.getItem(key)
  return JSON.parse(value)
}

export { setItem, getItem }
