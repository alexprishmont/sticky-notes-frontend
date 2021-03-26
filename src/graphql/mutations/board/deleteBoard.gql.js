import gql from 'graphql-tag';

const DELETE_BOARD_MUTATION = gql`
    mutation deleteBoard($id: ID!) {
        deleteBoard(id: $id) {
            message
        }
    }
`;

export default DELETE_BOARD_MUTATION;
