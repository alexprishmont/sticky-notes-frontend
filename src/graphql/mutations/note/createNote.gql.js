import gql from 'graphql-tag';
import NOTE_FIELDS_FRAGMENT from '../../fragments/noteFragment.gql';

const CREATE_NOTE_MUTATION = gql`
    ${NOTE_FIELDS_FRAGMENT}
    mutation createNote(
        $title: String! 
        $body: String! 
        $userId: String! 
        $boardId: String!
        $isFeatured: Boolean
    ) {
        createNote(
            title: $title
            body: $body
            userId: $userId
            boardId: $boardId
            isFeatured: $isFeatured
        ) {
            ...NoteFields
        }
    }
`;

export default CREATE_NOTE_MUTATION;
