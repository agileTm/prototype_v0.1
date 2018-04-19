import { get, post } from '@/modules/http.module';

export const questionStore = {
    state: {
        questions: []
    },
    actions: {
        questionAdd: async ({commit}: any, payload: { title: string, content: string}) =>
            await post('/infotrade/question', payload),
        questionGet: async({commit}: any) => {
            const result = await get('/infotrade/question');
            commit('questionAdd', result);
        }
    },
    getters: {
        questions: (state: any) => state.questions
    },
    mutations: {
        questionAdd: (state: any, data: any) => {
            state.questions = data;
        }
    }
};