import Question from './Question.route.vue';
import QuestionAdd from './add/Question-add.route.vue'
import QuestionGet from './get/Question-get.route.vue'

export const questionRouter = [
    {
        path: '/question',
        name: 'question',
        component: Question,
        meta: { requiresAuth: true},
        children: [
            {
                path: '/',
                name: 'question-get',
                component: QuestionGet
            },
            {
                path: 'add',
                name: 'question-add',
                component: QuestionAdd
            }
        ]
    }
];