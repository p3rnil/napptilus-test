import React, { createContext, useContext, useReducer } from 'react'

const OompaLoompaStateContext = createContext()
const OompaLoompaDispatchContext = createContext()

const oompaLoompaReducer = (state, action) => {
  switch (action.type) {
    case 'update_list': {
      return { list: [...state.list, ...action.payload] }
    }
    case 'load_selected': {
      return { selected: action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const OompaLoompaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(oompaLoompaReducer, {
    list: [],
    selected: null,
  })
  return (
    <OompaLoompaStateContext.Provider value={state}>
      <OompaLoompaDispatchContext.Provider value={dispatch}>
        {children}
      </OompaLoompaDispatchContext.Provider>
    </OompaLoompaStateContext.Provider>
  )
}

const useOompaLoompaState = () => {
  const context = useContext(OompaLoompaStateContext)
  if (context === undefined) {
    throw new Error(
      'useOompaLoompaState must be used within a OompaLoompaProvider'
    )
  }
  return context
}

const useOompaLoompaDispatch = () => {
  const context = useContext(OompaLoompaDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useOompaLoompaDispatch must be used within a OompaLoompaProvider'
    )
  }
  return context
}

export { OompaLoompaProvider, useOompaLoompaState, useOompaLoompaDispatch }
