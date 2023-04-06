const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });

        if (!author) {
          return [];
        }

        query.author = author._id;
      }
      if (args.genre === "all genres") args.genre = null;

      if (args.genre) {
        query.genres = { $in: [args.genre] };
      }

      return Book.find(query).populate("author");
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
    allGenres: async (root, args) => {
      const books = await Book.find({});
      const genresArray = books.map((book) => book.genres);
      const genreSet = new Set();
      for (const genreArray of genresArray) {
        for (const genre of genreArray) {
          genreSet.add(genre);
        }
      }
      genreSet.add("all genres");
      return [...genreSet];
    }
  },
  Author: {
    bookCount: async (root) => await root.bookList.length
  },
  Author: {
    bookCount: async (root) => Book.count({ author: root.id })
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      let foundAuthor = await Author.findOne({ name: args.author });
      foundAuthor = foundAuthor
        ? foundAuthor
        : new Author({ name: args.author });
      const book = new Book({ ...args, author: foundAuthor });

      try {
        await book.save();
        await foundAuthor.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      try {
        author.save();
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  }
};

module.exports = resolvers;
