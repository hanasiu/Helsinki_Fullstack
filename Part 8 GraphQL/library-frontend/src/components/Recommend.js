import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'

const Recommend = () => {
  const favoriteResult = useQuery(FAVORITE_GENRE)
  const favorite = favoriteResult?.data?.me?.favoriteGenre
 
  const result = useQuery(ALL_BOOKS, {
    variables: { author: null, genre: favorite },
  });

  if (result.loading)  {
    return <div>loading...</div>
  }
  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <h4>Your Favorite: {favorite}</h4>
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
    </div>
  )
}

export default Recommend