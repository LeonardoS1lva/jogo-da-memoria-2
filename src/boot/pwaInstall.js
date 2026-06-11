import { usePwaInstallStore } from "src/stores/pwa-install";

export default () => {
  const pwaStore = usePwaInstallStore();

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();

    pwaStore.setPrompt(e);
  });

  window.addEventListener("appinstalled", () => {
    pwaStore.markAsInstalled();
  });
};
