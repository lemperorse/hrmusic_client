<template>
<q-page>
    <section class="min-h-screen flex items-stretch text-white ">
        <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style="background-color: #161616;">
            <div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style="background-image: url(https://sv1.picz.in.th/images/2021/11/08/uXFjPb.png);">
                <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
            </div> 
            <div class="w-full py-6 z-20">
                <h1 class="my-6 text-4xl font-semibold ">
                    Heart Exercise
                </h1>
                <div class="py-6 space-x-2">
                    <q-btn @click="facebookLogin()" color="primary" icon="facebook" label="Login with Facebook" />
                </div>
                <p class="text-gray-100">
                    or use email your account
                </p>
                <form class="w-2/3  py-6 mx-auto" @submit.prevent="getLogin()">
                    <q-input v-model="form.username" color="black" dense bg-color="white" outlined label="Username" />
                    <q-input v-model="form.password" class="mt-4" color="black" dense bg-color="white" type="password" outlined label="Password" />
                    <q-btn type="submit" style="width:100%;" class="mt-6 " color="green" label="Login" />
                </form>
                <div class="flex justify-around">
                    <q-btn dense flat @click="$router.push('/register')">Register</q-btn>
                    <q-btn @click="$router.push('/forgot')" flat dense>Forgot</q-btn>
                </div>
            </div>
        </div>
    </section>
</q-page>
</template>

<script>

</script><script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { Core } from '../../store/core'
import { Auth } from '../../store/auth'
import { Facebook } from '../../store/facebook'
import { Alert } from '../../store/alert'

@Component({
    components: {}
})
export default class LoginPage extends Vue {

    form: any = {}
    async created() {
        await this.checkUser();
        await this.callbackFacebook();

    }
    async facebookLogin() {
        await Facebook.login()
    }

    async callbackFacebook() {
        let user: any = await Facebook.getUserWhenLogin();
        if (user.formReg && user.formLog) {
            let logined = await Auth.login(user.formLog, false);
            if (logined) {
                 this.form = user.formLog
                 await this.getLogin();
            } else {
                this.form = user.formReg
                await this.register()
            }

        }
    }

    async getFacebookUser() {
        let user = Facebook.USER
        if (user.formLog) {
            await alert(JSON.stringify(user))
        }
    }

    async getLogin() {
        await Auth.login(this.form);
        let user = await Auth.getUser();
        if (user.id) {
            await this.$router.replace('/app/home/')
            await location.reload();
           
        }  
    }

    async checkUser() {
        let user = await Auth.getUser();
        if (user.id) {
            await this.$router.replace('/app/home/')
        }
    }

    async register() {
        let reg = await Core.postHttp(`/auth-reg/register/`, this.form);
        if (reg.id) {
            // alert('Register Success')
            Alert.openAlert("success", "Register Success", "");
            await this.$router.go(-1);
        } else {
            Alert.openAlert("error", "Cannot Regitser", "");
            // alert('Cannot Regitser')
        }
    }
};
</script>
