<template>
  <q-page class="bg-profile">
    <div class="flex flex-col pl-6 mt-6">
      <h1 class="text-3xl font-bold">Profile</h1>
      <span>Setting My Account</span>
    </div>
    <div class="flex flex-col justify-center items-center w-full">
      <form class="w-full p-4" @submit.prevent="editUser()">
        <q-input
          v-model="formUser.username"
          disable
          class="m-2 mt-4"
          outlined
          type="text"
          label="Username"
        />
        <q-input
          v-model="formUser.email"
          dense
          disable
          class="m-2"
          outlined
          type="text"
          label="Email address"
        />
        <!-- <q-input        class="m-2" outlined type="text" label="Password confirm" />
        <q-input       class="m-2 mb-4" outlined type="text" label="Password" /> -->
        <hr />
        <q-input
          v-model="formUser.first_name"
          dense
          class="m-2 mt-4"
          outlined
          type="text"
          label="First name"
        />
        <q-input
          v-model="formUser.last_name"
          dense
          class="m-2"
          outlined
          type="text"
          label="Last name"
        />

        <q-input
          v-model="formUser.bitrhday"
          dense
          class="m-2"
          outlined
          type="date"
          label="Bitrhday"
        />
        <q-input
          v-model="formUser.weight"
          dense
          class="m-2"
          outlined
          type="number"
          label="Weight"
        />
        <q-input
          v-model="formUser.height"
          dense
          class="m-2"
          outlined
          type="number"
          label="Height"
        />

        <div class="flex flex-row justify-around mt-4">
          <q-btn
            outline
            class="m-2"
            color="orange"
            icon="mdi-form-textbox-password"
            label="Change Password"
          />
          <q-btn
            type="submit"
            class="m-2"
            color="green"
            icon="check"
            label="Save"
          />
        </div>
      </form>
      <br />
      <br />
      <div class="w-full">
        <center>
          <q-btn
            @click="logout()"
            style="width: 90%"
            class="m-2"
            color="red"
            icon="login"
            label="Logout"
          />
        </center>
      </div>
    </div>

    <br /><br />
  </q-page>
</template>

<script>
</script><script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Core } from "../../store/core";
import { Auth } from "../../store/auth";
@Component({
  components: {},
})
export default class PageIndex extends Vue {
  formUser: any = {};

  async created() {
    await this.loadUser();
  }

  async loadUser() {
    this.formUser = await Auth.getUser();
  }

  async editUser() {
    let user = await Core.putHttp(`/auth-reg/profile/`, this.formUser);
    if (user.id) {
      alert("Edit User Success");
      await this.loadUser();
    }
  }

  async logout() {
    await Auth.logout();
    await location.reload();
  }
}
</script>

<style scoped>
</style>
