import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      image
      skills {
        name
      }
    }
  }
`;

export const GET_SKILLS = gql`
  query {
    skills {
      id
      name
    }
  }
`;
