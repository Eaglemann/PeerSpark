import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
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
