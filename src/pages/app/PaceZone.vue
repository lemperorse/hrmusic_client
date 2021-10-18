<template>
  <q-page class="bg-goal">
    <div class="flex flex-col pl-6 mt-6">
      <h1 class="text-3xl font-bold">Place Zone</h1>
      <span>Running in zone</span>
    </div>
    <div class="flex flex-col justify-center items-center">
      <div class="mt-4">
        <h2 class="text-base ml-4 font-bold">Threshold Running Pace</h2>
        <div class="flex w-full justify-center items-center">
          <q-input
            style="width: 35%"
            dense
            type="text"
            class="m-1"
            outlined
            label="Min"
          />
          <q-input
            style="width: 35%"
            dense
            type="text"
            class="m-1"
            outlined
            label="Second"
          />
          <q-btn
            round
            class="m-2"
            color="primary"
            icon="mdi-calculator-variant"
          />
        </div>
        <div class="p-4">
          <q-input
            dense
            type="text"
            class="m-1"
            outlined
            label="Treshold HR (Bpm)"
          />
        </div>

        <div
          class="m-4 shadow-xl"
          :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
        >
          <q-toolbar class="bg-blue text-white">
            <q-toolbar-title> Personal Pace Zone </q-toolbar-title>
            <!-- <q-btn dense flat round color="white" icon="mdi-plus-circle" /> -->
          </q-toolbar>
          <div class="w-full p-4">
            <div class="flex border-b-1 border-gray-400 mb-2" v-for="x in 5">
              <h2 class="text-base w-1/4">Z1 Easy</h2>
              <q-input dense type="text" class="w-1/4" outlined label="Min" />
              <q-input
                dense
                type="text"
                class="ml-2 w-1/4"
                outlined
                label="Max"
              />
              <h2 class="text-base">&nbsp min/km</h2>
            </div>
          </div>
        </div>

        <div
          class="m-4 shadow-xl"
          :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
        >
          <q-toolbar class="bg-orange text-white">
            <q-toolbar-title> Personal Pace Music </q-toolbar-title>
          </q-toolbar>
          <div class="w-full p-4">
            <div class="flex border-b-1 border-gray-400 mb-2" v-for="x in 5">
              <h2 class="text-base w-1/4">Z1 Easy</h2>
              <q-input dense type="text" class="w-1/4" outlined label="Min" />
              <q-input
                dense
                type="text"
                class="ml-2 w-1/4"
                outlined
                label="Max"
              />
              <h2 class="text-base">&nbsp bpm</h2>
            </div>
          </div>
        </div>
      </div>
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
