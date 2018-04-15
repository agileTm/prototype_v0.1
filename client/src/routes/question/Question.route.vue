<template>
    <div>
        <h1>질문 하기</h1>
        <div>
            <form @submit.prevent="save">
                <div>
                    <input v-model="title" autofocus placeholder="제목" required>
                </div>
                <div>
                    <textarea v-model="content" required placeholder="내용"></textarea>
                </div>
                <button type="submit">저장하기</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Question extends Vue {
        title: string = '';
        content: string = '';

        async save() {
            try {
                await this.$store.dispatch('questionSave', {title: this.title, content: this.content});
                alert('완료 되었습니다.');
                this.title = '';
                this.content = '';
            } catch (e) {
                alert(e);
            }

        }
    }
</script>

<style scoped lang="scss">
    input {
        width: 800px;
        border-radius: 5px;
        height: 30px;
        font-size: 18px;
        margin: 5px 0;
    }

    textarea {
        border-radius: 5px;
        width: 800px;
        height: 400px;
        font-size: 16px;
    }
</style>
