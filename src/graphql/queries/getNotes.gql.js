import gql from 'graphql-tag';
import NOTE_FIELDS_FRAGMENT from '../fragments/noteFragment.gql';

const GET_NOTES_QUERY = gql`
    ${NOTE_FIELDS_FRAGMENT}
    query getNotes($filter: FiltersExpression) {
        notes(filter: $filter) {
            note { 
                ...NoteFields
            }
            currentPage
            totalPages
            message
        }
    }
`;

export default GET_NOTES_QUERY;
