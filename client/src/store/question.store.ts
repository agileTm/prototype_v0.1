import { post } from '@/modules/http.module';

export const questionStore = {
    state: {
        questions: []
    },
    actions: {
        questionSave: async ({commit}: any, payload: { title: string, content: string}) =>
            await post('/infotrade/question', payload)
    },
    getters: {},
    mutations: {}
};