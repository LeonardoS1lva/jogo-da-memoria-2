<script setup>
import { ref } from 'vue'
import { useScoreStore } from 'src/stores/scoreStore'
import { useAudioStore } from 'src/stores/audioStore'

const scoreStore = useScoreStore()
const audioStore = useAudioStore()
const showModal = ref(true)

const emit = defineEmits(['back-to-menu', 'new-game'])

const newGame = () => {
  audioStore.playClickSound()
  showModal.value = false
  emit('new-game')
}

const backToMenu = () => {
  audioStore.playClickSound()
  showModal.value = false
  emit('back-to-menu')
}
</script>

<template>
    <q-dialog v-model="showModal" backdrop-filter="blur(2px)" persistent>
    <q-card class="q-pa-md text-white" style="background: rgba(0, 0, 0, 0.95)">
      <h5 class="text-h5 text-center title-shadow-3 text-primary-color text-uppercase title-size">
        Parabéns!
      </h5>
      <h5 class="text-h5 text-center title-shadow-3 text-white title-size">
        Sua pontuação: {{ scoreStore.getScore }}
      </h5>
      <div class="q-px-lg">
        <q-btn
          @click="newGame"
          label="Novo Jogo"
          color="primary-color"
          text-color="secondary-color"
          class="text-subtitle2 q-mt-md full-width"
          style="border-radius: 8px"
          size="md"
          no-caps
        />
        <q-btn
          @click="backToMenu"
          label="Voltar ao Menu"
          color="third-color"
          class="text-subtitle2 q-mt-md full-width"
          style="border-radius: 8px"
          size="md"
          no-caps
        />
      </div>
    </q-card>
  </q-dialog>
</template>
