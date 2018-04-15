<template>
    <div class="home">
        <h1>Home</h1>
        <div v-if="signInfo.id">
            {{signInfo.id}}
            /
            <router-link to="/question" v-if="signInfo.type === 'A'">질문하기</router-link>
            /
            <a @click="signOut">로그아웃</a>
        </div>
        <div v-else>
            <router-link to="/signup">회원가입</router-link>
            /
            <router-link to="/signin">로그인</router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { mapGetters } from 'vuex';

    @Component({
        computed: mapGetters(['signInfo'])
    })
    export default class Home extends Vue {
        signOut() {
            this.$store.dispatch('signOut');
            this.$router.push('/');
        }
    }
</script>

<style scoped lang="scss">
    a {
        cursor: pointer;
    }
</style>
