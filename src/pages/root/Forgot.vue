<template>
<q-page class="bgx">
    <div class="flex flex-col justify-center items-center">
        <q-toolbar class="text-primary">
            <q-btn @click="$router.go(-1)" flat round icon="mdi-arrow-left-circle-outline" />
            <q-toolbar-title> Forgot Password </q-toolbar-title>
        </q-toolbar>
     
        <form class="w-3/4" @submit.prevent="forgotPassword()">
           <q-input required v-model="form.login" color="black" dense bg-color="white" class="m-1" outlined   label="Your Username" />
            <q-btn type="submit" style="width: 100%" class="mt-3" color="primary" icon="check" label="Forgot" />
        </form>
    </div>

    <br /><br />
 </q-page>
</template>

<script>

</script>

<script lang="ts"> 
import { Vue, Component } from 'vue-property-decorator';
 import {
    Core
} from "../../store/core";
import {
    Alert
} from "../../store/alert";
 @Component({
    components: {   }
})
export default class PageIndex extends Vue {

    form:any = {}
     async forgotPassword() {
        let forgot = await Core.postHttp(`/auth-reg/send-reset-password-link/`, this.form);
        if (forgot.detail == 'Reset link sent') {
            // alert('Register Success')
            Alert.openAlert("success", "Sent Link Forgot to your email", "");
          
        } else {
            Alert.openAlert("error", "Cannot Sent Link Forgot to your email", "");
            // alert('Cannot Regitser')
        }
    }
};
</script>
