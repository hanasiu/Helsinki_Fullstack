import { handleChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={(e) => dispatch(handleChange(e.target.value))} />
      </div>
    )
  }
  
  export default Filter