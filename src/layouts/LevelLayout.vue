<script setup>
import TabFooter from 'src/components/TabFooter.vue'
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-secondary-color q-pt-md">
      <q-toolbar>
        <div class="col-1"></div>
        <div class="col-1">
          <q-btn
            square
            outline
            dense
            color="third-color"
            text-color="primary-color"
            icon="arrow_back"
            style="border-radius: 8px"
            @click="$router.push({ name: 'MenuGame' })"
          />
        </div>
        <h2 class="col-8 text-center text-h6 q-my-xs text-primary-color title-shadow-3">
          Jogo da Memória
        </h2>

        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

    <TabFooter />
  </q-layout>
</template>
