import gql from 'graphql-tag';
import BOARD_FIELDS_FRAGMENT from '../../fragments/boardFragment.gql';

const UPDATE_BOARD_MUTATION = gql`
    ${BOARD_FIELDS_FRAGMENT}
    mutation updateBoard($id: ID! $title: String!) {
        updateBoard(id: $id title: $title) {
            ...BoardFields
        }
    }
`;

export default UPDATE_BOARD_MUTATION;
