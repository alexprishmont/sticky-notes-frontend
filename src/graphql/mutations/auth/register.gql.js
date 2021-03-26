import gql from 'graphql-tag';

const REGISTER_MUTATION = gql`
    mutation register($email: String! $password: String! $name: String!) {
        signup(email: $email password: $password name: $name) {
            _id
            name
        }
    }
`;

export default REGISTER_MUTATION;
