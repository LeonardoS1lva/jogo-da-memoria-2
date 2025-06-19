import { defineStore, acceptHMRUpdate } from 'pinia'

export const useScoreStore = defineStore('scoreStore', {
  state: () => ({
    score: 0,
    highScore: {
      easy: [],
      medium: [],
      hard: [],
    },
    startTime: null,
    endTime: null,
  }),
  getters: {
    getScore: (state) => state.score,
    getHighScore: (state) => state.highScore,
  },
  actions: {
    resetScore() {
      this.score = 0
      this.startTime = null
      this.endTime = null
    },
    loadHighScores() {
      const data = localStorage.getItem('highScores')
      if (data) {
        this.highScore = JSON.parse(data)
      }
    },
    saveHighScores() {
      localStorage.setItem('highScores', JSON.stringify(this.highScore))
    },
    setHighScore(newHighScore, difficulty) {
      if (!this.highScore[difficulty]) {
        this.highScore[difficulty] = []
      }
      if (this.highScore[difficulty].length < 5) {
        this.highScore[difficulty].push(newHighScore)
      } else {
        const minScore = Math.min(...this.highScore[difficulty])
        if (newHighScore > minScore) {
          const index = this.highScore[difficulty].indexOf(minScore)
          this.highScore[difficulty][index] = newHighScore
        }
      }
      this.highScore[difficulty].sort((a, b) => b - a)
      this.saveHighScores()
    },
    calculateScore(elapsedTime, difficulty) {
      if (difficulty === 'easy') {
        this.score = Math.max(0, Math.floor(100000 / elapsedTime))
      } else if (difficulty === 'medium') {
        this.score = Math.max(0, Math.floor(750000 / elapsedTime))
      } else if (difficulty === 'hard') {
        this.score = Math.max(0, Math.floor(2000000 / elapsedTime))
      }
    }
  }
})











//
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScoreStore, import.meta.hot))
}
