import gql from 'graphql-tag';
import BOARD_FIELDS_FRAGMENT from '../../fragments/boardFragment.gql';

const CREATE_BORD_MUTATION = gql`
    ${BOARD_FIELDS_FRAGMENT}
    mutation createBoard($title: String! $userId: String!) {
        createBoard(title: $title userId: $userId) {
            ...BoardFields
        }
    }
`;

export default CREATE_BORD_MUTATION;
