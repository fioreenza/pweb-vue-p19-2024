<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppFooter from './components/AppFooter.vue';
import AppNavbar from './components/AppNavbar.vue';
</script>

<template>
    <AppNavbar>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </AppNavbar>
    <RouterView />
    <AppFooter />
</template>