import { defineStore } from "pinia";
import { ref } from "vue";

export const usePwaInstallStore = defineStore("pwaInstall", () => {
  const canInstallPWA = ref(false);
  const isInstalled = ref(false);

  let deferredPrompt = null;

  const setPrompt = (prompt) => {
      deferredPrompt = prompt;
      canInstallPWA.value = true;
    };

  const setIOS = () => {
    canInstallPWA.value = true;
  };

  const installPWA = async () => {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      canInstallPWA.value = false;
    }

    deferredPrompt = null;

    return outcome === "accepted";
  };

  const markAsInstalled = () => {
    isInstalled.value = true;
    canInstallPWA.value = false;
    deferredPrompt = null;
  };

  return {
    canInstallPWA,
    isInstalled,
    installPWA,
    setPrompt,
    setIOS,
    markAsInstalled,
  };
});
