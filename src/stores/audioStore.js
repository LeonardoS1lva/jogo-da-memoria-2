import { defineStore } from 'pinia'
import { watch } from 'vue'

const MAX_VOLUME = 0.3

export const useAudioStore = defineStore('audio', {
  state: () => ({
    backgroundMusic: new Audio('/sounds/8_bit_nostalgia.mp3'),
    clickSound: new Audio('/sounds/click.wav'),
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
        this.backgroundMusic.volume = this.musicVolume * MAX_VOLUME
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
      this.backgroundMusic.volume = volume * MAX_VOLUME
    },
    playClickSound() {
      this.clickSound.volume = this.effectsVolume * MAX_VOLUME
      if (this.isEffectsActive) {
        this.clickSound.play().catch((e) => {
          console.warn('Erro ao tocar som de clique:', e)
        })
      }
    },
    updateEffectsVolume(volume) {
      this.effectsVolume = volume
      this.clickSound.volume = volume * MAX_VOLUME
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
    restoreAudioSettings() {
      const data = localStorage.getItem('audioSettings')
      if (data) {
        const settings = JSON.parse(data)
        this.musicVolume = settings.musicVolume ?? 0.2
        this.effectsVolume = settings.effectsVolume ?? 0.2
        this.isMusicActive = settings.isMusicActive ?? true
        this.isEffectsActive = settings.isEffectsActive ?? true
      }
    }
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

  watch(
    () => [store.musicVolume, store.effectsVolume, store.isMusicActive, store.isEffectsActive],
    ([musicVolume, effectsVolume, isMusicActive, isEffectsActive]) => {
      localStorage.setItem(
        'audioSettings',
        JSON.stringify({
          musicVolume,
          effectsVolume,
          isMusicActive,
          isEffectsActive,
        }),
      )
    },
    { deep: true },
  ),
)
