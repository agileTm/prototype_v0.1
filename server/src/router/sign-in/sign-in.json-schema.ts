export const signInSchema = {
    description: 'sign up schema',
    type: 'object',
    properties: {
        id: {
            description: 'id',
            type: 'string'
        },
        password: {
            description: 'password',
            type: 'string'
        }
    },
    required: ['id', 'password'],
};