import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { useApolloClient, useSubscription } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqById = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqById(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  //const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("books-user-token") || null
  );
  const [errorMessage, setErrorMessage] = useState(null);
  //const [recommend, setRecommend] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)

      updateCache(client.cache, 
        { query: ALL_BOOKS, variables: { author: null, genre: null } }, addedBook)
    }
  })

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  // if (!token) {
  //   return (
  //     <>
  //       <Notify errorMessage={errorMessage} />
  //       <LoginForm setToken={setToken} setError={notify} />
  //     </>
  //   )
  // }
  const padding = {
    padding: 5
  };
  return (
    <Router>
      <div>
        <Notify errorMessage={errorMessage} />

        <div>
          <Link style={padding} to="/authors">
            authors
          </Link>
          <Link style={padding} to="/books">
            books
          </Link>
          {token ? (
            <Link style={padding} to="/newbook">
              new book
            </Link>
          ) : null}
          {token ? (
            <Link style={padding} to="/recommend">
              recommend
            </Link>
          ) : null}
          {token ? (
            <button onClick={logout}>logout</button>
          ) : (
            <Link style={padding} to="/login">
              login
            </Link>
          )}
        </div>
        <Routes>
          <Route path="/authors" element={<Authors setError={notify} />} />
          <Route path="/books" element={<Books />} />
          <Route
            path="/login"
            element={
              <LoginForm
                setToken={setToken}
                setError={notify}
              />
            }
          />
          <Route path="/newbook" element={<NewBook setError={notify} />} />
          
          <Route
            path="/recommend"
            element={<Recommend token={token} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
