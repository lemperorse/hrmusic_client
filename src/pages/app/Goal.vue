<template>
  <q-page class="bg-goal">
    <div class="flex flex-col pl-6 mt-6">
      <h1 class="text-3xl font-bold">Goal</h1>
      <span>Setting my goal</span>
    </div>
    <div class="flex flex-col justify-center items-center">
      <form @submit.prevent="saveGoal()">
        <q-select
          v-model="form.running_distance"
          :options="[5, 10, 21, 42, 100]"
          class="m-1 mt-4"
          outlined
          type="text"
          label="Running distance (km)"
        />
        <q-input
          v-model="form.race_date"
          type="date"
          class="m-1 mt-4"
          outlined
          label="Race date"
        />
        <div class="mt-4">
          <div class="flex flex-row justify-around rounded-xl shadow-2xl">
            <q-toolbar class="bg-purple text-white">
              <q-toolbar-title> List Plan </q-toolbar-title>
              <q-btn
                @click="planDialog = true"
                dense
                flat
                round
                color="white"
                icon="mdi-plus-circle"
              />
            </q-toolbar>
            <div class="w-full bg-boxx">
              <q-card-section
                class="border-b-1 border-gray-400"
                :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
                v-for="(current, j) in listChoosePlan"
                :key="j"
              >
                <div class="text-h6">{{ current.name }}</div>
                <div class="text-subtitle2">{{ current.coach_name }}</div>
              </q-card-section>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-around mt-4">
          <q-btn
            @click="previewDialog = true"
            class="m-2"
            color="orange"
            icon="mdi-eye"
            label="Preview"
          />
          <q-btn
            type="submit"
            class="m-2"
            color="primary"
            icon="check"
            label="Set Goal"
          />
        </div>
      </form>
    </div>

    <q-dialog v-model="planDialog" persistent>
      <q-card class="w-full p-4">
        <h2 class="text-xl">Choose Plan</h2>
        <q-card-section class="row items-center">
          <!-- <pre>{{plans}}</pre> -->
          <q-card-section
            class="rounded-xl border-2 border-blue-400 w-full"
            v-for="(plan, i) in plans"
            :key="i"
          >
            <div class="text-h6">{{ plan.name }}</div>
            <div class="">{{ plan.coach_name }}</div>
            <div class="text-subtitle2">{{ plan.day_traning_program }}</div>
            <q-btn
              color="primary"
              icon="check"
              label="Choose"
              @click="addPlan(plan)"
            />
          </q-card-section>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="previewDialog" persistent>
      <q-card>
        <q-toolbar class="bg-purple text-white">
          <q-btn flat round dense icon="assignment_ind" />
          <q-toolbar-title> Preview </q-toolbar-title>
          <q-btn v-close-popup flat round dense icon="close" class="q-mr-xs" />
        </q-toolbar>
        <q-card-section class="row items-center">
          <q-date v-model="dateRang" range />
        </q-card-section>
        <q-card-actions align="right"> </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
</script><script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Core } from "../../store/core";
import { Auth } from "../../store/auth";
import _ from "lodash";
@Component({
  components: {},
})
export default class PageIndex extends Vue {
  planDialog: any = false;
  previewDialog: boolean = false;
  listChoosePlan: any = [];
  form: any = {
    plan: [],
  };
  plans: any = null;
  user: any = {};
  dateRang: any = { from: "2020/07/08", to: "2020/07/17" };
  async created() {
    this.user = await Auth.getUser();
    await this.getPlan();
    this.form.user = this.user.id;
    await this.getDefaultGoal();
  }

  async getPlan() {
    this.plans = await Core.getHttp(`/api/exercise/plan/`);
  }

  async addPlan(plan: any) {
    this.form.plan.push(plan.id);
    this.listChoosePlan.push(plan);
    this.planDialog = false;
  }

  async saveGoal() {
    let save = await Core.postHttp(`/api/exercise/goal/`, this.form);
    if (save.id) {
      alert("Set Goal Success");
    }
  }

  async getDefaultGoal() {
    let goal = await Core.getHttp(`/api/exercise/goal/?user=${this.user.id}`);
    if (goal[0]) {
      this.form = goal[0];
      await this.getDefaultPlan(this.form.id);
    }
  }

  async getDefaultPlan(id: []) {
    let currentPlan = _.filter(this.plans, (v) => _.indexOf(id, v.id) === -1);
    this.listChoosePlan = currentPlan;
  }
}
</script>

<style>
</style>
