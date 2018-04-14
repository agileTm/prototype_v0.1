import { post, setJWT } from '@/modules/http.module';
import { SessionStorage } from '@/modules/session-storage.module';

const SESSION_STORAGE_TOKEN = 'token';

export const signStore = {
    state: {
        id: '',
        token: ''
    },
    actions: {
        signUp: async ({commit}: any, payload: { id: string, password: string, type: 'A' | 'B' }) =>
            await post('/signup', payload),

        signIn: async ({commit}: any, payload: { id: string, password: string }) => {
            const result: any = await post('/signin', payload);

            SessionStorage.set(SESSION_STORAGE_TOKEN, result.token);
            commit('saveSignInfo', result);
        },

        signCheck: async ({commit, state, dispatch}: any) => {
            const token = state.token || SessionStorage.get(SESSION_STORAGE_TOKEN);
            if (token) {
                setJWT(token);
            }
            const result = await post('/signin/check').catch(() => dispatch('signOut'));

            commit('saveSignInfo', {id: result.id, token: token});
        },

        signOut: ({commit}: any) => {
            SessionStorage.remove(SESSION_STORAGE_TOKEN);
            commit('deleteSignInfo');
        }
    },
    getters: {
        signInfo: (state: any) => state.id
    },
    mutations: {
        saveSignInfo: (state: any, data: any) => {
            state.token = data.token;
            state.id = data.id;
        },
        deleteSignInfo: (state: any) => {
            state.token = '';
            state.id = '';
        }
    }
};