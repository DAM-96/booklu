import { gql } from '@apollo/client';
const userInfo = `
{
    _id
    username
    email
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
}
`

// FROM
// async createUser({ body }, res) {
//     const user = await User.create(body);

//     if (!user) {
//       return res.status(400).json({ message: 'Something is wrong!' });
//     }
//     const token = signToken(user);
//     res.json({ token, user });
//   }
export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser( username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`


//FROM
// export const loginUser = (userData) => {
//   return fetch('/api/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
// };
export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $pasword) {
            token,
            user {
                _id
                username
            }
        }
    }
`


//FROM
// async saveBook({ user, body }, res) {
//     console.log(user);
//     try {
//       const updatedUser = await User.findOneAndUpdate(
//         { _id: user._id },
//         { $addToSet: { savedBooks: body } },
//         { new: true, runValidators: true }
//       );
//       return res.json(updatedUser);
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json(err);
//     }
//   },
export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String], $description: Srting!, $bookId: String!, $image: String, $link: String, $title: String!){
        saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title){
            saveBook(input: {
                authors: $authors
                description: $description
                bookId: $bookId
                image: $image
                link: $link
                title: $title
              }) ${userInfo}
        }
    }

`


//FROM
// export const deleteBook = (bookId, token) => {
//     return fetch(`/api/users/books/${bookId}`, {
//       method: 'DELETE',
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//   };
export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: ID!) {
        deleteBook(bookID: $bookId) ${userInfo}
    }
`