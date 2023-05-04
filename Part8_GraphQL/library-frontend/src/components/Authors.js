import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, CHANGE_BORN } from '../queries'
import Select from 'react-select';

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [setBornTo, setBorn] = useState('')
  //const [selectedOption, setSelectedOption] = useState(null);
  const result = useQuery(ALL_AUTHORS)

  const [ changeBorn ] = useMutation(CHANGE_BORN, {
    refetchQueries: [ {query: ALL_AUTHORS} ],
    onError: (error) => {
      const errorMessage = error.graphQLErrors[0].message
      props.setError(errorMessage)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({variables: {name, setBornTo}})

    //setName('')
    setBorn('')
  }
  
  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  const authorNameList = authors.map((author)=>{
    return {value: author.name, label:author.name}
  })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>name
        <Select
        defaultValue={name}
        onChange={(name)=>setName(name.value)}
        options={authorNameList}
      />
          </div>
        <div>born
          <input 
          type="number"
          value={setBornTo}
          onChange={({ target }) => setBorn(parseInt(target.value))}/>
          </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
