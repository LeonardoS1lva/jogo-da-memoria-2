<script setup>
import { ref } from 'vue'
import DialogSettings from 'src/components/DialogSettings.vue'

const showSettings = ref(false)

defineProps({
  showRecords: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <q-footer class="bg-third-color">
    <q-tabs class="text-primary-color" no-caps>
      <q-route-tab name="home" icon="home" :to="{ name: 'MenuGame' }" class="q-py-md" />
      <q-route-tab
        name="levels"
        icon="apps"
        :to="{ name: 'ChooseDifficulty' }"
        exact
        class="q-py-md"
      />
      <q-route-tab v-if="showRecords" name="trophy" icon="emoji_events"  :to="{ name: 'Records' }" class="q-py-md" />
      <q-route-tab name="settings" icon="settings" @click="showSettings = true" class="q-py-md" />
    </q-tabs>
  </q-footer>

  <DialogSettings v-if="showSettings" @close="showSettings = false" />
</template>
