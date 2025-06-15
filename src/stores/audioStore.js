import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    backgroundMusic: new Audio('/sounds/8_bit_nostalgia.mp3'),
    musicVolume: 0.2,
    effectsVolume: 0.2,
    isMusicPausedVisibility: false,
    isEffectsActive: true,
    isMusicActive: true,
  }),
  actions: {
    playBackgroundMusic() {
      if (this.backgroundMusic.paused) {
        this.backgroundMusic.loop = true
        this.backgroundMusic.volume = this.musicVolume
        if (this.isMusicActive) {
          this.backgroundMusic.play().catch((e) => {
            console.warn('Erro ao tocar música de fundo:', e)
          })
        }
      }
    },
    stopBackgroundMusic() {
      this.backgroundMusic.pause()
      this.backgroundMusic.currentTime = 0
    },
    updateMusicVolume(volume) {
      this.musicVolume = volume
      this.backgroundMusic.volume = volume
    },
    playClickSound() {
      const clickSound = new Audio('/sounds/click.wav')
      clickSound.volume = this.effectsVolume
      if (this.isEffectsActive) {
        clickSound.play().catch((e) => {
          console.warn('Erro ao tocar som de clique:', e)
        })
      }
    },
    updateEffectsVolume(volume) {
      this.effectsVolume = volume
    },
    handleVisibilityChange() {
      if (document.hidden) {
        if (!this.backgroundMusic.paused) {
          this.backgroundMusic.pause()
          this.isMusicPausedVisibility = true
        }
      } else {
        if (this.isMusicPausedVisibility) {
          this.backgroundMusic.play().catch((e) => {
            console.warn('Erro ao retomar a música:', e)
          })
          this.isMusicPausedVisibility = false
        }
      }
    },
  },
})

const store = useAudioStore()

watch(
  () => store.isMusicActive,
  (notMuted) => {
    if (notMuted) {
      store.playBackgroundMusic()
    } else {
      store.backgroundMusic.pause()
    }
  },
)

watch(
  () => store.isEffectsActive,
  (notMuted) => {
    let soundVolume
    if (store.effectsVolume > 0) {
      soundVolume = store.effectsVolume
    } else {
      soundVolume = 0.2
    }
    if (notMuted) {
      store.effectsVolume = soundVolume
    } else {
      store.effectsVolume = 0
    }
  },
)
