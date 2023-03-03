import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useNotificationDispatch } from './NotificationContext' 

const App = () => {
  const queryClient = useQueryClient()
  
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const dispatch = useNotificationDispatch()
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    dispatch(`anecdote '${anecdote.content}' voted`)
  }

  const result = useQuery(
    'anecdotes', getAnecdotes, {
      refetchOnWindowFocus: false
    },
    {
      retry: 1
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }


  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
