import { defineStore } from "pinia";
import { ref } from "vue";

export const usePwaInstallStore = defineStore("pwaInstall", () => {
  const canInstallPWA = ref(false);
  const isInstalled = ref(false);

  let deferredPrompt = null;

  function setPrompt(prompt) {
    deferredPrompt = prompt;
    canInstallPWA.value = true;
  }

  async function installPWA() {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      canInstallPWA.value = false;
    }

    deferredPrompt = null;

    return outcome === "accepted";
  }

  function markAsInstalled() {
    isInstalled.value = true;
    canInstallPWA.value = false;
    deferredPrompt = null;
  }

  return {
    canInstallPWA,
    isInstalled,
    installPWA,
    setPrompt,
    markAsInstalled,
  };
});
