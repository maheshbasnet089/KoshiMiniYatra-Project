<template>
    <div>
        <header>
            <navbar-component/>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <footer-component/>
        </footer>
    </div>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue"
import FooterComponent from "./components/FooterComponent.vue"
    export default {
        name:'TemplateView',
        components:{NavbarComponent,FooterComponent}
    }
</script>

<style lang="scss" scoped>

</style>