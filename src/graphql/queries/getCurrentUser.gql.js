import gql from 'graphql-tag';
import USER_FULL_FIELDS from '../fragments/userFullFields.gql';

const GET_CURRENT_USER = gql`
    ${USER_FULL_FIELDS}
    query getCurrentUser {
        me {
            ...UserFullFields
        }
    }
`;

export default GET_CURRENT_USER;
