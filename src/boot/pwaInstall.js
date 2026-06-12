import { usePwaInstallStore } from "src/stores/pwa-install";
import { Platform } from "quasar";

export default () => {
  const pwaStore = usePwaInstallStore();

  if (Platform.is.ios) {
    const notBrowser = !window.matchMedia("(display-mode: browser)").matches;
    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;

    if (notBrowser || isInStandaloneMode()) {
      pwaStore.markAsInstalled();
    } else {
      pwaStore.setIOS();
    }
  } else {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();

      pwaStore.setPrompt(e);
    });

    window.addEventListener("appinstalled", () => {
      pwaStore.markAsInstalled();
    });
  }
};
