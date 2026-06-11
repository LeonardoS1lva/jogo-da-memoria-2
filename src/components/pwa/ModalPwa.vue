<script setup>
import { usePwaInstallStore } from 'src/stores/pwa-install'

const pwaStore = usePwaInstallStore()
</script>

<template>
  <div v-if="!$q.platform.is.ios">
    <q-dialog v-model="pwaStore.canInstallPWA" persistent backdrop-filter="brightness(40%)">
      <q-card class="bg-white text-black">
        <q-card-section class="bg-third-color text-white">
          <div class="text-h6">Instalar Aplicativo</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-body1 q-mt-sm">Deseja instalar o aplicativo em seu dispositivo?</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="bg-third-color">
          <q-btn label="Fechar" color="white" text-color="third-color" v-close-popup />
          <q-btn label="Instalar" color="primary-color-dark" @click="pwaStore.installPWA" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

  <div v-if="$q.platform.is.ios">
    <q-dialog v-model="pwaStore.canInstallPWA" persistent backdrop-filter="brightness(40%)">
      <q-card class="bg-white text-black">
        <q-card-section class="bg-third-color text-white">
          <div class="text-h6">Instalar Aplicativo</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-body1 q-mt-sm">
            Para instalar o aplicativo em seu dispositivo iOS, siga os passos abaixo:

            <ol class="q-mt-sm">
              <li>
                Toque no ícone de compartilhamento (geralmente um quadrado com uma seta para cima).
              </li>
              <li>Role para baixo e selecione "Adicionar à Tela de Início".</li>
              <li>Confirme a adição do aplicativo à sua tela inicial.</li>
            </ol>

            Após seguir esses passos, o aplicativo estará disponível na sua tela inicial para acesso
            rápido.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="bg-third-color">
          <q-btn label="Fechar" color="white" text-color="third-color" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
