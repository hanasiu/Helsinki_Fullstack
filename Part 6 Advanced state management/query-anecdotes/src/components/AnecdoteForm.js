import { useNotificationDispatch } from '../NotificationContext'
import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: (err) => {
      dispatch(`error: ${err.message}`)
    }
  })

  const addAnecdote = async (event) => {
    //event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0})
    return content
  }

  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = await addAnecdote(event)
    dispatch(`anecdote '${content}' added`) 
  }
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
