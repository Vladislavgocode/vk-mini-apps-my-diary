<template>
  
  <v-app >
    <v-main>
        <Bar ></Bar>
        <RouterView></RouterView>
        <Nav ></Nav>
    </v-main>
  </v-app>
</template>

<script setup>
  import Nav from '@/components/Nav.vue'
  import Bar from '@/components/Bar.vue'
  import { RouterLink , RouterView } from 'vue-router';
</script>



