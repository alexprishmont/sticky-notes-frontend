import gql from 'graphql-tag';
import BOARD_FIELDS_FRAGMENT from '../fragments/boardFragment.gql';

const GET_BOARDS_QUERY = gql`
    ${BOARD_FIELDS_FRAGMENT}
    query getBoards($filter: FiltersExpression) {
        boards(filter: $filter) {
            board { 
                ...BoardFields
            }
            currentPage
            totalPages
            message
        }
    }
`;

export default GET_BOARDS_QUERY;
