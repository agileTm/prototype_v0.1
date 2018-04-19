<template>
    <div>
        <h1>로그인</h1>
        <div>
            <form @submit.prevent="signIn">
                <div>
                    <input v-model="id" autofocus placeholder="아이디" required>
                </div>
                <div>
                    <input type="password" v-model="password" placeholder="패스워드" required>
                </div>
                <button type="submit">로그인</button>
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

        async signIn() {
            try {
                await this.$store.dispatch('signIn', {id: this.id, password: this.password});
                const redirect = this.$route.query.redirect;
                if(redirect) {
                    this.$router.push(redirect);
                }else {
                    this.$router.push('/');
                }
            } catch (e) {
                alert(e);
            }

        }
    }
</script>

<style scoped lang="scss">
    input {
        width: 300px;
        border-radius: 5px;
        height: 30px;
        font-size: 18px;
        margin: 5px 0;
    }
</style>
