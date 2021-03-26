import gql from 'graphql-tag';

const USER_FULL_FIELDS = gql`
    fragment UserFullFields on User {
        _id
        name
        email
        password
        createdAt
        updatedAt
    }
`;

export default USER_FULL_FIELDS;
