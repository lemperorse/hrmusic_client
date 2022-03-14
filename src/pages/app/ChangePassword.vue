<template>
<q-page class="bgx">
    <div class="flex flex-col justify-center items-center">
        <q-toolbar class="text-primary">
            <q-btn @click="$router.go(-1)" flat round icon="mdi-arrow-left-circle-outline" />
            <q-toolbar-title> Change Password </q-toolbar-title>
        </q-toolbar>

        <form class="w-3/4" @submit.prevent="changePassword()">
            <q-input type="password"  required v-model="form.old_password" color="black" dense bg-color="white" class="m-1" outlined label="Old Password" />
           <br>
            <q-input type="password"   persistent-hint hint="Password must have A-Z,a-z,0-9" required v-model="form.password" color="black" dense bg-color="white" class="m-1" outlined label="New Password" />
          <br>
            <q-input type="password"   persistent-hint hint="Password must have  A-Z,a-z,0-9" required v-model="form.password_confirm" color="black" dense bg-color="white" class="m-1" outlined label="Confirm Password" />

            <q-btn type="submit" style="width: 100%" class="mt-3" color="primary" icon="check" label="Change Password" />
        </form>
    </div>

    <br /><br />
</q-page>
</template>

<script>

</script>

<script lang="ts">
 import {
     Vue,
     Component
 } from 'vue-property-decorator';
 import {
     Core
 } from "../../store/core";
 import {
     Alert
 } from "../../store/alert";
 @Component({
     components: {}
 })
 export default class PageIndex extends Vue {

     form: any = {}
     async changePassword() {
         let forgot = await Core.postHttp(`/auth-reg/change-password/`, this.form);
         if (forgot.detail) {
             // alert('Register Success')
             Alert.openAlert("success", "Change Password Success", "");

         } else {
             Alert.openAlert("error", "Cannot Change Password", "");
             // alert('Cannot Regitser')
         }
     }
 };
</script>
