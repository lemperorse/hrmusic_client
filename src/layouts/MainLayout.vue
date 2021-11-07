<template>
<q-layout view="lHh Lpr lFf" v-if="response">
    <!-- <q-header elevated>
        <q-toolbar>
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

            <q-toolbar-title>
                Heart Exercise
            </q-toolbar-title>

            <div>Alpha v0.1b</div>
        </q-toolbar>
    </q-header> -->

    <q-drawer :content-class="bg" v-model="leftDrawerOpen" show-if-above bordered >
        <q-list>
            <q-item-label header :class="t" class="font-semibold">
                Menu
            </q-item-label>
            <EssentialLink :class="t" v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-list>
    </q-drawer>

    <q-page-container :class="(dark)?`bg-black`:`bg-white`"  >
        <router-view />
    </q-page-container>
    <q-footer class=" bg-transparent ">
        <div :class="(dark)?`bg-black`:`bg-white`" class="  sticky bottom-2  p-5 px-6 p-2  flex items-center justify-between   shadow-3xl text-gray-400 rounded-2xl cursor-pointer">
            <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400   " @click="$router.push('/app/profile')">
                <span class="mdi mdi-account-circle text-xl"></span>
                <span>Profile</span>

            </div>
            <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400  mr-4" @click="$router.push('/app/calendar')" >  
                <span class="mdi mdi-calendar  text-xl"></span>
                <span>Calendar</span>
            </div>
            <div class="flex flex-col items-center   " @click="$router.push('/app/home')">
                <div class="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50   bg-blue-400 w-20 h-20 p-2 text-white transition ease-in duration-200 ">
                    <i class="em em-man-running  text-3xl" aria-role="presentation" aria-label=""></i> 
                </div>
            </div>
            <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ml-4" @click="$router.push('/app/connect')">
                <span class="mdi mdi-bluetooth  text-xl"></span>
                <span>Devices</span>

            </div>
            <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 "  @click="leftDrawerOpen = !leftDrawerOpen">
                <span class="mdi mdi-apps  text-xl"></span>
                <span>Menu</span>
            </div>
        </div>
    </q-footer>

</q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import { Core } from '../store/core'
import { Auth } from '../store/auth'
import { bluetooth } from '../plugins/ble'
import { Blex } from '../store/bluetooth'

const serviceUUID = '180d'
const characteristicUUID = '2a37'
const BLE: any = bluetooth
const linksData = [{
        title: 'Home',
        caption: 'Recoard Activity',
        icon: 'em em-sparkling_heart',
        link: '/app/home'
    },
    {
        title: 'Profile',
        caption: 'Setting My Account',
        icon: 'em em-male-astronaut',
        link: '/app/profile'
    },
    {
        title: 'Calendar',
        caption: 'View Training Date',
        icon: 'em em-calendar',
        link: '/app/calendar'
    },
    {
        title: 'Pace Zone',
        caption: 'Running in zone',
        icon: 'em em-man-running',
        link: '/app/pace'
    },
    {
        title: 'Goal',
        caption: 'Setting my goal',
        icon: 'em em-triangular_flag_on_post',
        link: '/app/goal'
    },
    {
        title: 'Devices',
        caption: 'Connect HeartRate Device',
        icon: 'mdi mdi-bluetooth',
        link: '/app/connect'
    },
    {
        title: 'Setting',
        caption: 'Config Application',
        icon: 'em em-compression',
        link: '/app/setting'
    },
    {
        title: 'About',
        caption: 'Application Info',
        icon: 'em em-information_source',
        link: '/app/about'
    }
];

import { Vue, Component } from 'vue-property-decorator';

@Component({
    components: { EssentialLink }
})
export default class MainLayout extends Vue {
    private dark:boolean = Core.DARK
    leftDrawerOpen = false;
    essentialLinks = linksData;
    user: any = null
    response: boolean = false;
    drawer: any = null

    async created() {
        await Auth.checkToken();
        this.user = await Auth.setUser();
        await this.checkUser();
        this.response = (this.user.id) ? true : false;
        await Blex.getConnectOld()
    }

    async checkUser() {
        let user = await Auth.getUser();
        if (!user.id) {
            await this.$router.replace(`/`)
        }
    }

     get t() {
        return (!this.dark) ? `text-black` : `text-white`
    }
    get bg() {
        return (this.dark) ? `bg-black` : `bg-white`
    }

}
</script>
