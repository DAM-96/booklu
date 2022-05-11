const {  User } = require("../models");
const Auth = require("../utils/auth");
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        users: async()=>{
            return User.find({});
        },
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
        getMe: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate("books");
            }
            throw new Error("The user is not signed in");
          }
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = Auth.signToken(user);
            return { token, user };
        },
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            password = user.isCorrectPassword(password);
            const token = signToken(user);
            if (!user) {
                throw new Error("No accounts under this email");
            }

            if (!password) {
                throw new Error("Invalid password")
            }
            return { token, user };
        },
        saveBook: async (parent, { input }, context) => {
            if (context.user) {
              const userAddedBook = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: input } },
                { new: true}
              );
              return userAddedBook;
            }
          },
          deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const userDeletedBook = await User.findOneAndUpdate(
                { _id: context.user._id,},
                { $pull: { savedBooks: 
                    { bookId: bookId } 
                } },
                { new: true }
              );
              return userDeletedBook;
            }
          }
    }
}

module.exports = { resolvers };