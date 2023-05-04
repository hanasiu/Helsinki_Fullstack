import { useDispatch, useSelector } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li>
            {anecdote.content}
            <strong> has {anecdote.votes}</strong>
            <button onClick={handleClick}>vote</button>
        </li>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ input, anecdotes }) => {
        return anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().includes(input.toLowerCase()))
    })
    anecdotes.sort((a, b) => b.votes - a.votes)

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        dispatch(updateVotes(anecdote))
                        dispatch(setNotification(`you voted "${anecdote.content}" `, 5))
                    }
                    }
                />
            )}
        </ul>
    )
}

export default AnecdoteList