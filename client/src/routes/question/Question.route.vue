<template>
    <div>
        <br>
        <div v-if="signInfo.id">
            <router-link to="/question/add" v-if="signInfo.type === 'A'">질문하기</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { mapGetters } from 'vuex';

    @Component({
        computed: mapGetters(['signInfo'])
    })
    export default class Question extends Vue {}
</script>
