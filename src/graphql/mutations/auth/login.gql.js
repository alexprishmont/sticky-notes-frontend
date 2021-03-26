import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
    mutation login($email: String! $password: String!) {
        login(email: $email password: $password) {
            token
            tokenExpiration
        }
    }
`;

export default LOGIN_MUTATION;
