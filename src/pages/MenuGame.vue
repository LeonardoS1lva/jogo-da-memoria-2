<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAudioStore } from 'src/stores/audioStore'
import { useAudioVisibility } from 'src/composable/useAudioVisibility'
import DialogSettings from 'src/components/DialogSettings.vue'

const router = useRouter()
const audioStore = useAudioStore()
audioStore.restoreAudioSettings()

const showSettings = ref(false)

const clickAndToggleSettings = () => {
  audioStore.playClickSound()
  showSettings.value = !showSettings.value
}

const startGame = () => {
  audioStore.playClickSound()
  router.push('/chooseDifficulty')
}

useAudioVisibility()
</script>

<template>
  <q-page class="flex flex-center background-style">
    <q-card flat class="main-card q-pa-lg text-center" style="background-color: transparent">
      <h1 class="title-shadow non-selectable q-px-md q-pb-lg no-margin text-primary-color">
        Jogo da Memória 8-Bit
      </h1>
      <div class="row justify-center q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-btn
            @click="startGame"
            label="Jogar"
            color="primary-color"
            text-color="secondary-color"
            class="text-subtitle1 full-width"
            style="border-radius: 8px"
            size="lg"
            no-caps
          />
        </div>
        <div class="col-12 col-md-4">
          <q-btn
            @click="clickAndToggleSettings"
            label="Configurações"
            color="third-color"
            text-color="white"
            class="text-subtitle1 full-width"
            style="border-radius: 8px"
            size="lg"
            no-caps
          />
        </div>
      </div>
    </q-card>

    <!-- Modal de Configurações -->
    <DialogSettings v-if="showSettings" @close="showSettings = false" />
  </q-page>
</template>

<style scoped>
.main-card {
  width: 90%;
  max-width: 1000px;
}

@media (max-width: 600px) {
  .title-shadow {
    font-size: 2.2rem;
    text-shadow: 4px 4px 0 rgba(22, 56, 35, 0.8);
  }
}
</style>
