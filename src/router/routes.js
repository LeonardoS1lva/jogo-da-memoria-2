const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/MenuGame.vue'), name: 'MenuGame' },
      {
        path: '/highScores',
        component: () => import('src/pages/HighScores.vue'),
        name: 'Records',
      },
    ],
  },
  {
    path: '/chooseDifficulty',
    component: () => import('src/layouts/LevelLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/ChooseDifficulty.vue'),
        name: 'ChooseDifficulty',
      },
      {
        path: '/game/:difficulty?',
        component: () => import('src/pages/GameScreen.vue'),
        name: 'Game',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
