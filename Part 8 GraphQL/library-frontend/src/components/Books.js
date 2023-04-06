import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [ genrefilter, setGenrefilter ] = useState(null)
  const genreResult = useQuery(ALL_GENRES)
  const genreList = genreResult?.data?.allGenres
  const bookResult = useQuery(ALL_BOOKS, {
    variables: { author: null, genre: genrefilter },
  });

  console.log(bookResult)
 

  if (bookResult.loading)  {
    return <div>loading...</div>
  }
  const books = bookResult?.data?.allBooks

  const submitFilter = (genre) => {
    setGenrefilter(genre)
    bookResult.refetch({ name: null, genre: genre })
  }

  return (
    <div>
      <h2>books</h2>
      {genrefilter === 'all genres' || genrefilter === null ? 
      <div><b>all</b> of books</div> :
      <div>in genre <b>{genrefilter}</b></div>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreList.map(genre => {
            return <button 
            key={genre}
            onClick={() => submitFilter(genre)}
            >
              {genre}</button>
          })}
    </div>
  )
}

export default Books
