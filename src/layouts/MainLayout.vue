<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> CompWeek 2022 </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Links </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "dev.gerencianet",
    icon: "school",
    link: "https://dev.gerencianet.com.br",
  },
  {
    title: "Github",
    caption: "github.com/CamiloAvelar",
    icon: "code",
    link: "https://github.com/CamiloAvelar",
  },
  {
    title: "Gerencianet no Discord",
    caption: "chat.gerencianet.dev",
    icon: "chat",
    link: "https://gerencianet.github.io/gn-comunidade-discord",
  },
  {
    title: "Instagram",
    caption: "@gerencianet",
    icon: "rss_feed",
    link: "https://instagram.com/gerencianet",
  },
  {
    title: "Vagas",
    caption: "@gerencianet",
    icon: "school",
    link: "https://jobs.kenoby.com/gerencianet",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
