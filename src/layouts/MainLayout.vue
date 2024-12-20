<template>
  <q-layout view="hhh lpR fff">
    <q-header class="q-py-md bg-white" bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          color="black"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <div class="q-mx-md">
          <q-img
            src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702951/assets/fjqfqywlp4zvtxv5rkau.png"
            style="width: 50px"
          />
        </div>
        <q-toolbar-title class="text-primary text-h6 text-weight-medium">
          DCS Pixel Hub
        </q-toolbar-title>
        <div>
          <userProfie />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <EssentialLink />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import userProfie from "src/components/userProfie.vue";
defineOptions({
  name: "MainLayout",
});

const leftDrawerOpen = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
