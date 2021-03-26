import gql from 'graphql-tag';

const DELETE_NOTE_MUTATION = gql`
    mutation deleteNote($id: ID!) {
        deleteNote(id: $id) {
            message
        }
    }
`;

export default DELETE_NOTE_MUTATION;
