<template>
    <div id="app">
        <router-link to="/">Home</router-link>
        <router-view/>
    </div>
</template>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        font-size: 16px;
        width: 1020px;
        margin: 0 auto;
        padding: 10px
    }
</style>
