<template>
    <div>
        <h1>질문 보기</h1>
        <ul>
           <li v-for="(question, index) of questions" :key="index">
               {{question.title}} / {{question.date | formatDate}}
           </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { dateFilters } from '../../../filters/date.filter';
    import { mapGetters } from 'vuex';

    @Component({
        computed: {
            ...mapGetters(['questions'])
        },
        filters: {
            ...dateFilters
        }
    })
    export default class QuestionGet extends Vue {
        created() {
            this.$store.dispatch('questionGet');
        }
    }
</script>

<style scoped lang="scss">
</style>
