<script setup>
import TabFooter from 'src/components/TabFooter.vue'
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <TabFooter :show-records="true" />
  </q-layout>
</template>
