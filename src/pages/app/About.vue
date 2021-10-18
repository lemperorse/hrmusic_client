<template>
  <q-page class="bg-goal">
    <div
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
      class="
        flex flex-col
        justify-center
        items-center
        shadow-4xl
        mt-10
      "
    >
      <div>
        <i
          class="em em-gift_heart text-6xl"
          aria-role="presentation"
          aria-label="HEART WITH RIBBON"
        ></i>
      </div>
      <h1 class="text-3xl font-bold">Heart Exercise</h1>
      <span>Application for exercise with music</span>
      <span class="mt-4 font-bold">Version Alpha0.1a</span>
      <span class="mt-4 font-bold">Copyright 2021 © Nattapon Kumyaito</span>
    </div>
  </q-page>
</template>

<script>
</script><script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class PageIndex extends Vue {}
</script>

<style>
</style>
