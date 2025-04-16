import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserById($id: uuid!) @cached {
    users_by_pk(id: $id) {
      id
      name
      email
      profile_picture
      bio
      is_active
      created_at
      updated_at
      user_skills {
        skill {
          id
          name
          description
        }
      }
    }
  }
`;
export const GET_ALL_USERS = gql`
  query GetAllUsers @cached {
    users(where: { is_active: { _eq: true } }) {
      id
      name
      email
      profile_picture
      bio
    }
  }
`;
