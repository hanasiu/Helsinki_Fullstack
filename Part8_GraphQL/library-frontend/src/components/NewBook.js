import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS, ALL_GENRES, FAVORITE_GENRE } from '../queries'
import { updateCache } from '../App'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const favoriteResult = useQuery(FAVORITE_GENRE)
  const favorite = favoriteResult?.data?.me?.favoriteGenre

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ 
      //{ query: ALL_BOOKS, variables:{author:null, genre:null} },
      { query: ALL_BOOKS, variables:{author:null, genre:favorite} },
      { query: ALL_AUTHORS },
      { query: ALL_GENRES },
    ],
    onError: (error) => {
      // const errorMessage = error.graphQLErrors[0].message
      // props.setError(errorMessage)
      props.setError(error.message)
    },
    update: (cache, response) => {
      updateCache(cache, 
        { query: ALL_BOOKS, variables: { author: null, genre: null } }, response.data.addBook)
    //   cache.updateQuery({ query: ALL_BOOKS, variables: { author: null, genre: null } },
    // ({ allBooks }) => {
    //     return {
    //       allBooks: allBooks.concat(response.data.addBook),
    //     }
    //   })
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: {title, author, published, genres}})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook