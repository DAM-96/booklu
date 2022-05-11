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


//FROM
// // route to get logged in user's info (needs the token)
// export const getMe = (token) => {
//   return fetch('/api/users/me', {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//   });
// };
export const GET_ME = gql`
    query get_me{
        get_me ${userInfo}
    }
`
