<template>
    <div class="home">
        <h1>Home</h1>
        <router-link to="/signup">회원가입</router-link>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Home extends Vue {}
</script>
