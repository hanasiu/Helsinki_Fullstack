import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    handleChange(state, action) {
      return action.payload
    }
  }

}) 

export const { handleChange } = filterSlice.actions
export default filterSlice.reducer

// const filterReducer = (state = '', action) => {
//     console.log('ACTION: ', action)
//     switch (action.type) {
//       case 'SET_FILTER':
//         return action.payload
//       default:
//         return state
//     }
//   }

//   export const handleChange = input => {
//     return {
//         type: 'SET_FILTER',
//         payload: input
//     }
//   }

  
//   export default filterReducer