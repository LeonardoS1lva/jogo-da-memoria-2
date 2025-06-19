<script setup>
import { onMounted, ref } from 'vue'
import { useScoreStore } from 'src/stores/scoreStore'
import { useAudioStore } from 'src/stores/audioStore'
import { useAudioVisibility } from 'src/composable/useAudioVisibility'

const audioStore = useAudioStore()
audioStore.restoreAudioSettings()

const scoreStore = useScoreStore()

const tab = ref('easy')

const rankingColor = (index) => {
  switch (index) {
    case 0:
      return 'first-place-color'
    case 1:
      return 'second-place-color'
    case 2:
      return 'third-place-color'
    default:
      return 'default-place-color'
  }
}

const difficulties = [
  { name: 'easy', label: 'fácil' },
  { name: 'medium', label: 'médio' },
  { name: 'hard', label: 'difícil' }
]

useAudioVisibility()

onMounted(() => {
  scoreStore.loadHighScores()
})
</script>

<template>
  <q-page class="row column items-center background-style">
    <q-card flat class="level-card q-py-lg text-center" style="background-color: transparent">
      <h1 class="non-selectable q-pb-md no-margin menu-title text-white title-shadow-2">
        Placar de Pontuações
      </h1>
      <q-tabs v-model="tab" active-color="primary-color" class="text-grey-8" dense>
        <q-tab
          v-for="d in difficulties"
          :key="d.name"
          :name="d.name"
          :label="d.label"
        />
      </q-tabs>

      <q-separator class="bg-grey-9" />

      <q-tab-panels v-model="tab" animated style="background-color: transparent">
        <q-tab-panel
          v-for="d in difficulties"
          :key="d.name"
          :name="d.name"
        >
          <q-card
            class="row justify-between items-center q-px-md q-py-sm q-mb-md bg-third-color"
            v-for="(score, index) in scoreStore.highScore[d.name]"
            :key="index"
          >
            <div>
              <q-avatar
                color="grey-8"
                :text-color="rankingColor(index)"
                :style="{ border: '2px solid var(--' + rankingColor(index) + ')' }"
              >
                <span class="text-h6">{{ index + 1 }}</span>
              </q-avatar>
            </div>
            <span class="text-h6 text-white">{{ score }}</span>
            <q-icon name="emoji_events" size="md" :color="rankingColor(index)" />
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
