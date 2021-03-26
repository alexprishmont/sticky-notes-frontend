import gql from 'graphql-tag';

const USER_FIELDS_FRAGMENT = gql`
    fragment UserFields on User {
        _id
        name
        email
    }
`;

export default USER_FIELDS_FRAGMENT;
