<template>
    <div>
        <h1>회원 가입</h1>
        <div>
            <form  @submit="signUp">
                <div>
                    <input v-model="id" autofocus placeholder="아이디" required>
                </div>
                <div>
                    <input type="password" v-model="password" placeholder="패스워드" required>
                </div>
                <div>
                    <select v-model="type">
                        <option value="A">정보 소요자</option>
                        <option value="B">정보 공급자</option>
                    </select>
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class SignUp extends Vue {
        id: string = '';
        password: string = '';
        type: string = 'A';

        signUp() {
            console.log(this.id, this.password, this.type);
        }
    }
</script>
