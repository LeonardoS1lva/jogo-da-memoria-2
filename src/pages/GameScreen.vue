<script setup>
import { computed, onUnmounted, ref } from 'vue'
import { useAudioStore } from 'src/stores/audioStore'
import { useScoreStore } from 'src/stores/scoreStore'

import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAudioVisibility } from 'src/composable/useAudioVisibility'

const audioStore = useAudioStore()
audioStore.restoreAudioSettings()

const scoreStore = useScoreStore()

const elapsedTime = ref(0)

const router = useRouter()
const route = useRoute()

const allIcons = [
  '💣', '💎', '🍀', '🌟', '🎮', '🍄', '👾', '🚀',
  '🦄', '🧩', '🕹️', '🎲', '🧠', '🦾', '🦖', '🛸',
  '🐉', '🧙‍♂️', '🧙‍♀️', '🦸‍♂️', '🐋', '🧟', '🧛', '🧞',
  '🧜‍♂️', '🧚‍♀️', '🧝‍♂️', '🌍', '🍕', '🦹‍♀️', '☕', '⚽', '🏠', '❤️'
]

const pairsByDifficulty = {
  easy: 8, // 16 cards
  medium: 18, // 36 cards
  hard: 32, // 64 cards
}

const difficulty = computed(() => route.params.difficulty || 'easy')
const numPairs = computed(() => pairsByDifficulty[difficulty.value] || 8)
const icons = computed(() => allIcons.slice(0, numPairs.value))

const getDifficultyLabel = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'Fácil'
    case 'medium':
      return 'Médio'
    case 'hard':
      return 'Difícil'
    default:
      return 'Fácil'
  }
}

const cards = ref([])
const flippedCards = ref([])
const matchedCards = ref(0)
const gameOver = ref(false)

const initGame = () => {
  const selectedIcons = icons.value
  cards.value = [...selectedIcons, ...selectedIcons]
    .map((icon) => ({ icon, revealed: false }))
    .sort(() => Math.random() - 0.5)
  flippedCards.value = []
  matchedCards.value = 0
  gameOver.value = false
  scoreStore.loadHighScores()
  startTimer()
}

const revealCard = (index) => {
  if (flippedCards.value.length === 2 || cards.value[index].revealed) return
  audioStore.playClickSound()
  cards.value[index].revealed = true
  flippedCards.value.push(index)

  if (flippedCards.value.length === 2) {
    checkMatch()
  }
}

const resetGame = () => {
  audioStore.playClickSound()
  initGame()
}

const checkMatch = () => {
  const [firstIndex, secondIndex] = flippedCards.value
  if (cards.value[firstIndex].icon === cards.value[secondIndex].icon) {
    matchedCards.value += 1
    if (matchedCards.value === cards.value.length / 2) {
      scoreStore.calculateScore(elapsedTime.value, difficulty.value)
      scoreStore.setHighScore(scoreStore.getScore, difficulty.value)
      gameOver.value = true
    }
    flippedCards.value = []
  } else {
    setTimeout(() => {
      cards.value[firstIndex].revealed = false
      cards.value[secondIndex].revealed = false
      flippedCards.value = []
    }, 1000)
  }
}

const backToMenu = () => {
  audioStore.playClickSound()
  router.push('/')
}

useAudioVisibility()

let timer = null

const startTimer = () => {
  elapsedTime.value = 0
  timer = setInterval(() => {
    if (gameOver.value) {
      clearInterval(timer)
    } else {
      elapsedTime.value++
    }
  }, 1000)
}

onMounted(() => {
  initGame()
  scoreStore.loadHighScores()
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <q-page class="row justify-center background-style">
    <q-card
      flat
      class="card-game text-center"
      style="background: transparent"
      :style="cards.length > 36 && 'width: 100%; max-width: 1000px;'"
    >
      <h1 class="text-subtitle1 text-white title-shadow-3">
        <div>Nível: {{ getDifficultyLabel(difficulty) }}</div>
        <div>{{ String(Math.floor(elapsedTime / 60)).padStart(2, '0') }}:{{ String(elapsedTime % 60).padStart(2, '0') }}</div>
      </h1>
      <div :class="cards.length > 36 ? 'container-cards' : 'row justify-center'">
        <div
          v-for="(card, index) in cards"
          :key="index"
          :class="cards.length > 36 ? '' : cards.length > 16 ? 'col-2' : 'col-3'"
        >
          <q-btn
            :label="card.revealed ? card.icon : '❓'"
            class="card-btn q-mb-md"
            :class="card.revealed ? 'bg-white' : 'bg-third-color'"
            @click="revealCard(index)"
            :disabled="card.revealed || gameOver"
            style="box-shadow: inset 0 0 0 2px var(--primary-color); text-shadow: 0 0 100px rgba(0, 0, 0);"
          />
        </div>
      </div>
      <div v-if="gameOver" class="text-center q-px-lg q-pb-md">
        <p class="text-white q-my-md title-shadow-3" style="font-size: 1.2rem">Parabéns! Você completou o jogo!</p>
        <p class="text-white q-my-md title-shadow-3" style="font-size: 1.2rem">Sua pontuação: {{ scoreStore.getScore }}</p>
        <div class="row justify-center q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-btn
              @click="resetGame"
              label="Novo Jogo"
              color="primary-color"
              text-color="secondary-color"
              class="reset-btn full-width"
              size="md"
              padding="0.8rem 1.5rem"
              style="border-radius: 8px"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-btn
              @click="backToMenu"
              label="Voltar ao Menu"
              color="third-color"
              class="reset-btn q-ml-md full-width"
              size="md"
              padding="0.8rem 1.5rem"
              style="border-radius: 8px"
            />
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<style scoped>
.card-game {
  width: 90%;
  max-width: 600px;
  border-radius: 15px;
}

.container-cards {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1px;
}

.card-btn {
  width: 70px;
  height: 70px;
  font-size: 1.5rem;
  border-radius: 10px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.card-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.reset-btn {
  transition: transform 0.2s box-shadow 0.2s;
}

.reset-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

@media (max-width: 600px) {
  .card-game {
    width: 95%;
  }
  .card-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>
