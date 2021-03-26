import gql from 'graphql-tag';
import USER_FIELDS_FRAGMENT from './userMainFields.gql';

const BOARD_FIELDS_FRAGMENT = gql`
    ${USER_FIELDS_FRAGMENT}
    fragment BoardFields on Board {
        _id
        title
        user {
            ...UserFields
        }
        createdAt
        updatedAt
    }
`;

export default BOARD_FIELDS_FRAGMENT;
