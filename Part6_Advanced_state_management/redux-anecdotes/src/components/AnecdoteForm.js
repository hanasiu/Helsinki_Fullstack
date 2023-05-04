import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you created ${content} `, 5))
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
    )
}

export default AnecdoteForm