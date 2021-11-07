<template>
<q-page class=" bg-profile pt-6">

  
      <div class="flex  pr-6 ">
          <q-btn size="xl" flat color="red" icon="west"   @click="$router.go(-1)" />
        <q-space />
        <div class="text-right">
            <h1 :class="t"  class="text-3xl font-bold"> Profile</h1>
            <span :class="t"  >Setting My Account</span>
        </div> 
    </div>

    <div class="flex flex-col justify-center items-center w-full">
        <form class=" w-full p-4" @submit.prevent="editUser()">
            <q-input v-model="formUser.username" color="black" disable bg-color="white" class="m-2 mt-4" outlined type="text" label="Username" />
            <q-input v-model="formUser.email" color="black" dense disable bg-color="white" class="m-2" outlined type="text" label="Email address" />
            <!-- <q-input  color="black"     bg-color="white" class="m-2" outlined type="text" label="Password confirm" />
        <q-input  color="black"    bg-color="white" class="m-2 mb-4" outlined type="text" label="Password" /> -->
            <hr>
            <q-input v-model="formUser.first_name" color="black" dense bg-color="white" class="m-2 mt-4" outlined type="text" label="First name" />
            <q-input v-model="formUser.last_name" color="black" dense bg-color="white" class="m-2" outlined type="text" label="Last name" />

            <q-input v-model="formUser.bitrhday" color="black" dense bg-color="white" class="m-2" outlined type="date" label="Bitrhday" />
            <q-input v-model="formUser.weight" color="black" dense bg-color="white" class="m-2" outlined type="number" label="Weight" />
            <q-input v-model="formUser.height" color="black" dense bg-color="white" class="m-2" outlined type="number" label="Height" />

            <div class="flex flex-row justify-around mt-4">
                <q-btn outline class="m-2" color="orange" icon="mdi-form-textbox-password" label="Change Password" />
                <q-btn type="submit" class="m-2" color="green" icon="check" label="Save" />
            </div>
        </form>
        <br> <br>
        <div class="w-full">
            <center>
                <q-btn @click="logout()" style="width:90%;" class="m-2 " color="red" icon="login" label="Logout" />
            </center> 
        </div>

    </div>

    <br><br>
</q-page>
</template>

<script>

</script><script lang="ts">
import { Vue, Component } from 'vue-property-decorator'; 
import { Core } from '../../store/core'
import { Auth } from '../../store/auth'
@Component({
    components: {}
})
export default class PageIndex extends Vue {

    formUser:any = {}

    async created(){
        await this.loadUser();
    }

    async loadUser(){
        this.formUser = await Auth.getUser();
    }

    async editUser(){
        let user = await Core.putHttp(`/auth-reg/profile/`,this.formUser)
        if(user.id){
            alert('Edit User Success');
            await this.loadUser();
        }
    }

       async logout() {
        await Auth.logout();
        await location.reload();
    }

      private dark:boolean = Core.DARK
        get t(){
            return (!this.dark)?`text-black`:`text-white`
        }
        get bg(){
            return (!this.dark)?`bg-black`:`bg-white`
        }
        get t_gray(){
            return (!this.dark)?`text-gray-600`:`text-gray-300`
        }
        get t_gray_xl(){
            return (!this.dark)?`text-black`:`text-gray-600`
        }
  
  
   
};
</script>

<style scoped>
.bg-profile {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='560' height='1440' preserveAspectRatio='none' viewBox='0 0 560 1440'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1011%26quot%3b)' fill='none'%3e%3cpath d='M383.07 340.4 a55.08 55.08 0 1 0 110.16 0 a55.08 55.08 0 1 0 -110.16 0z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M264.57 880.45L297.7 880.45L297.7 913.58L264.57 913.58z' stroke='%23e73635'%3e%3c/path%3e%3cpath d='M238.41 211.7L262.82 211.7L262.82 233.5L238.41 233.5z' fill='%23e73635'%3e%3c/path%3e%3cpath d='M253.22 958.1L288.71 958.1L288.71 968.58L253.22 968.58z' stroke='%23e73635'%3e%3c/path%3e%3cpath d='M366.49 622.18 a53.06 53.06 0 1 0 106.12 0 a53.06 53.06 0 1 0 -106.12 0z' stroke='%23d3b714'%3e%3c/path%3e%3cpath d='M263.18 1036.69L303.61 1036.69L303.61 1077.12L263.18 1077.12z' stroke='%23e73635'%3e%3c/path%3e%3cpath d='M221.66 927.06L274.45 927.06L274.45 979.85L221.66 979.85z' fill='%23e73635'%3e%3c/path%3e%3cpath d='M349.47 710.77a42.44 42.44 0 1 0-25.46-80.97z' fill='%23e73635'%3e%3c/path%3e%3cpath d='M230.01 303.71L266.94 303.71L266.94 340.64L230.01 340.64z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M546.65 838.51L586.44 838.51L586.44 847.15L546.65 847.15z' fill='%23e73635'%3e%3c/path%3e%3cpath d='M153.46 957.49a23.71 23.71 0 1 0 29.06-37.47z' fill='%23e73635'%3e%3c/path%3e%3cpath d='M179.23 306.97a38.09 38.09 0 1 0-12.63 75.12z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M389.36 1138.29 a20.93 20.93 0 1 0 41.86 0 a20.93 20.93 0 1 0 -41.86 0z' fill='%23e73635'%3e%3c/path%3e%3cpath d='M-0.47 946.55a2.32 2.32 0 1 0 1.74 4.3z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M40.38 1202.08 a4.12 4.12 0 1 0 8.24 0 a4.12 4.12 0 1 0 -8.24 0z' fill='%23e73635'%3e%3c/path%3e%3cpath d='M61.19 82.7a46.06 46.06 0 1 0 87.55-28.64z' stroke='%23d3b714'%3e%3c/path%3e%3cpath d='M128.67 681.25L138.83 681.25L138.83 699.71L128.67 699.71z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M487.92 480.21L531.21 480.21L531.21 506.81L487.92 506.81z' fill='%23037b0b'%3e%3c/path%3e%3cpath d='M344.81 657.51 a22.91 22.91 0 1 0 45.82 0 a22.91 22.91 0 1 0 -45.82 0z' fill='%23037b0b'%3e%3c/path%3e%3cpath d='M199.22 682.84a11.43 11.43 0 1 0 21.6-7.48z' fill='%23037b0b'%3e%3c/path%3e%3cpath d='M418.74 743.02 a27.95 27.95 0 1 0 55.9 0 a27.95 27.95 0 1 0 -55.9 0z' fill='%23e73635'%3e%3c/path%3e%3cpath d='M422.24 1052.03 a43.66 43.66 0 1 0 87.32 0 a43.66 43.66 0 1 0 -87.32 0z' stroke='%23e73635'%3e%3c/path%3e%3cpath d='M164.14 1161.56L191.27 1161.56L191.27 1188.69L164.14 1188.69z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M534.96 117.91L550.2 117.91L550.2 133.15L534.96 133.15z' fill='%23037b0b'%3e%3c/path%3e%3cpath d='M457.48 1182.07L498.21 1182.07L498.21 1189.5L457.48 1189.5z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M18.18 801.73L37.46 801.73L37.46 807.85L18.18 807.85z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M564.03 1186.36a19.55 19.55 0 1 0-31.7 22.89z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M486.75 515.42L497.56 515.42L497.56 526.23L486.75 526.23z' stroke='%23e73635'%3e%3c/path%3e%3cpath d='M2.04 373.7L54.49 373.7L54.49 426.15L2.04 426.15z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M139.13 507.49L172.71 507.49L172.71 547.25L139.13 547.25z' fill='%23037b0b'%3e%3c/path%3e%3cpath d='M346.38 576.08 a55.37 55.37 0 1 0 110.74 0 a55.37 55.37 0 1 0 -110.74 0z' stroke='%23037b0b'%3e%3c/path%3e%3cpath d='M558.8 389.2L581.15 389.2L581.15 411.55L558.8 411.55z' fill='%23037b0b'%3e%3c/path%3e%3cpath d='M234.33 773.62L253.77 773.62L253.77 791.3L234.33 791.3z' fill='%23d3b714'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1011'%3e%3crect width='560' height='1440' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
}
</style>
