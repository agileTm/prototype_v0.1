import { post } from '@/services/http.service';


export default {
    signUp: async (id: string, password: string, type: string) =>
        await post('/signup', {id, password, type})
}