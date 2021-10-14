<template>
<q-page>
    <section class="min-h-screen flex items-stretch text-white ">
        <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style="background-color: #161616;">
            <div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style="background-image: url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80);">
                <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
            </div>
            <div class="w-full py-6 z-20">
                <h1 class="my-6 text-4xl">
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
                    <q-btn @click="$router.push('/app/home')" flat dense>Forgot</q-btn>
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
@Component({
    components: {}
})
export default class LoginPage extends Vue {

    form: any = {}
    async created() {
        await this.checkUser();
    }
    async facebookLogin() {
       
        await Facebook.login()
    }

    async getLogin() {
        await Auth.login(this.form);
        let user = await Auth.getUser();
        if (user.id) {
            //await location.reload();
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
};
</script>
