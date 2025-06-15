<script setup>
import { useRouter } from 'vue-router'
import { useAudioStore } from 'src/stores/audioStore'
import { useAudioVisibility } from 'src/composable/useAudioVisibility'
import { ref } from 'vue'

const router = useRouter()
const audioStore = useAudioStore()

const levelDifficulty = ref('')

const selectDifficulty = (difficulty) => {
  audioStore.playClickSound()
  levelDifficulty.value = difficulty
}

const startGame = () => {
  audioStore.playClickSound()
  router.push({ name: 'Game', params: { difficulty: levelDifficulty.value } })
}

useAudioVisibility()
</script>

<template>
  <q-page class="row column justify-between items-center background-style">
    <q-card flat class="level-card q-pa-lg text-center" style="background-color: transparent">
      <h1 class="non-selectable q-pb-md no-margin menu-title text-white title-shadow-2">
        Escolha a Dificuldade
      </h1>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-btn
            label="Fácil (4x4)"
            no-caps
            :color="levelDifficulty === 'easy' ? 'primary-color-dark' : 'secondary-color'"
            size="md"
            style="border-radius: 8px; border: 4px solid var(--primary-color)"
            class="full-width shadow-btn"
            @click="selectDifficulty('easy')"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-btn
            label="Médio (6x6)"
            no-caps
            :color="levelDifficulty === 'medium' ? 'primary-color-dark' : 'secondary-color'"
            size="md"
            style="border-radius: 8px; border: 4px solid var(--primary-color)"
            class="full-width shadow-btn"
            @click="selectDifficulty('medium')"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-btn
            label="Difícil (8x8)"
            no-caps
            :color="levelDifficulty === 'hard' ? 'primary-color-dark' : 'secondary-color'"
            size="md"
            style="border-radius: 8px; border: 4px solid var(--primary-color)"
            class="full-width shadow-btn"
            @click="selectDifficulty('hard')"
          />
        </div>
      </div>
    </q-card>
    <div class="row full-width q-py-lg">
      <div class="col-1"></div>
      <div class="col-10">
        <q-btn
          color="primary-color"
          text-color="secondary-color"
          label="Iniciar Jogo"
          size="lg"
          padding="md"
          class="full-width btn-start"
          @click="startGame"
        />
      </div>
      <div class="col-1"></div>
    </div>
  </q-page>
</template>

<style scoped>
.level-card {
  width: 90%;
  max-width: 600px;
  border-radius: 20px;
}

.menu-title {
  font-size: 2.5rem;
}

.shadow-btn {
  box-shadow: 4px 4px 0 #000;
}

.btn-start {
  border: 4px solid var(--secondary-color-dark);
  border-radius: 8px;
  box-shadow: 4px 4px 0 #000;
}

@media (max-width: 600px) {
  .menu-title {
    font-size: 1.9rem;
  }
}

@media (max-width: 400px) {
  .menu-title {
    font-size: 1.5rem;
  }
}
</style>
