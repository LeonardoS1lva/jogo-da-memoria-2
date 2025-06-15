<script setup>
import { ref } from 'vue'
import { useAudioStore } from 'src/stores/audioStore'

const audioStore = useAudioStore()
const showSettings = ref(true)

const emit = defineEmits(['close'])

const closeDialog = () => {
  audioStore.playClickSound()
  showSettings.value = false
  emit('close')
}

const updateVolume = () => {
  audioStore.updateMusicVolume(audioStore.musicVolume)
  audioStore.updateEffectsVolume(audioStore.effectsVolume)
  audioStore.playClickSound()
}
</script>

<template>
  <q-dialog v-model="showSettings" backdrop-filter="blur(2px)" persistent>
    <q-card class="settings-card q-pa-md text-white" style="background: rgba(0, 0, 0, 0.95)">
      <h5 class="text-h5 text-center title-shadow-3 text-primary-color text-uppercase">
        Configurações
      </h5>
      <div class="q-px-lg">
        <div class="row justify-between">
          <span class="title-shadow-3">Volume:</span>
          <span class="text-subtitle2 text-primary-color">
            {{ Math.round(audioStore.musicVolume * 100) }}%
          </span>
        </div>
        <q-slider
          v-model="audioStore.musicVolume"
          :min="0"
          :max="1"
          :step="0.01"
          @change="updateVolume"
          class="q-mt-md"
          color="primary-color"
          track-color="grey-10"
          track-size="8px"
          thumb-size="32px"
        />
        <div class="text-center">
          <small style="font-size: xx-small" class="text-grey-6">Ajuste o volume do jogo</small>
        </div>
      </div>
      <div class="q-mt-md q-px-lg">
        <div class="row justify-between items-center">
          <span class="title-shadow-3">Efeitos:</span>
          <q-toggle
            v-model="audioStore.isEffectsActive"
            color="primary-color"
          />
        </div>
        <div class="text-center">
          <small style="font-size: xx-small" class="text-grey-6">Ativar/Desativar efeitos sonoros</small>
        </div>
      </div>
      <div class="q-mt-md q-px-lg">
        <div class="row justify-between items-center">
          <span class="title-shadow-3">Música:</span>
          <q-toggle
            v-model="audioStore.isMusicActive"
            color="primary-color"
          />
        </div>
        <div class="text-center">
          <small style="font-size: xx-small" class="text-grey-6">Ativar/Desativar música de fundo</small>
        </div>
      </div>
      <!-- <div class="q-mt-md q-px-lg">
        <span class="title-shadow-3">Volume dos Efeitos:</span>
        <q-slider
          v-model="audioStore.effectsVolume"
          :min="0"
          :max="1"
          :step="0.1"
          @change="
            (audioStore.updateEffectsVolume(audioStore.effectsVolume), audioStore.playClickSound())
          "
          class="q-mt-md"
          color="primary-color"
          markers
          track-color="grey-8"
          track-size="8px"
          thumb-size="32px"
        />
      </div> -->
      <div class="q-px-lg">
        <q-btn
          @click="closeDialog"
          label="Fechar"
          color="primary-color"
          text-color="secondary-color"
          class="text-subtitle2 q-my-md full-width"
          style="border-radius: 8px"
          size="md"
          no-caps
        />
      </div>
    </q-card>
  </q-dialog>
</template>
