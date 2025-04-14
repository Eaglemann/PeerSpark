import { gql } from "@apollo/client";

export const ADD_SKILL = gql`
  mutation AddSkill($name: String!) {
    insert_skills(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    insert_users(objects: { name: $name, email: $email }) {
      returning {
        id
        name
        email
      }
    }
  }
`;
