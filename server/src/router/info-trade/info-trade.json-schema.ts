export const questionSchema = {
    description: 'sign up schema',
    type: 'object',
    properties: {
        title: {
            description: 'title',
            type: 'string'
        },
        content: {
            description: 'content',
            type: 'string'
        }
    },
    required: ['title', 'content'],
};