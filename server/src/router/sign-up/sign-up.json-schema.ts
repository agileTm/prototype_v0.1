export const signUpSchema = {
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
        },
        type: {
            description: '회원 타입을 애기한다. 정보 공급자 혹은 정보 수요자, 관리자, 테스터 등등 현재는 테스트 이기 때문에 A: 정보 소요자, B: 정보 공급자로 표현한다.',
            enum: [
                'A',
                'B'
            ],
            type: 'string'
        }
    },
    required: ['id', 'password', 'type'],
};
