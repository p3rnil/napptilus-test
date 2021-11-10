import React, { createContext, useContext, useReducer } from 'react'

const OompaLoompaStateContext = createContext()
const OompaLoompaDispatchContext = createContext()

const oompaLoompaReducer = (state, action) => {
  switch (action.type) {
    case 'update_list': {
      return {
        list: [...state.list, ...action.payload],
        filteredList: state.filteredList,
        selected: state.selected,
        page: state.page,
        loading: state.loading,
      }
    }
    case 'update_filteredList': {
      return {
        list: state.list,
        filteredList: action.payload,
        selected: state.selected,
        page: state.page,
        loading: state.loading,
      }
    }
    case 'increment_page': {
      return {
        list: state.list,
        filteredList: state.filteredList,
        selected: state.selected,
        page: state.page + 1,
        loading: state.loading,
      }
    }
    case 'update_loading': {
      return {
        list: state.list,
        filteredList: state.filteredList,
        selected: state.selected,
        page: state.page,
        loading: action.payload,
      }
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
    filteredList: null,
    selected: null,
    page: 1,
    loading: false,
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
