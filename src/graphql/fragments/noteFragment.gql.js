import gql from 'graphql-tag';
import USER_FIELDS_FRAGMENT from './userMainFields.gql';

const NOTE_FIELDS_FRAGMENT = gql`
    ${USER_FIELDS_FRAGMENT}
    fragment NoteFields on Note {
        _id
        title
        body
        isFeatured
        user {
            ...UserFields
        }
        createdAt
        updatedAt
    }
`;

export default NOTE_FIELDS_FRAGMENT;
