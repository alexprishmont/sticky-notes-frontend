import gql from 'graphql-tag';
import NOTE_FIELDS_FRAGMENT from '../../fragments/noteFragment.gql';

const UPDATE_NOTE_MUTATION = gql`
    ${NOTE_FIELDS_FRAGMENT}
    mutation updateNote(
        $id: ID!
        $title: String!
        $body: String!
        $isFeatured: Boolean
    ) {
        updateNote(
            id: $id
            title: $title
            body: $body
            isFeatured: $isFeatured
        ) {
            ...NoteFields
        }
    }
`;

export default UPDATE_NOTE_MUTATION;
