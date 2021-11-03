<template>
<q-layout view="lHh Lpr lFf" v-if="response">
    <q-header elevated>
        <q-toolbar>
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

            <q-toolbar-title>
                 Heart Exercise
            </q-toolbar-title>

            <div>Alpha v0.1b</div>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
        <q-list>
            <q-item-label header class="text-grey-8">
                Menu
            </q-item-label>
            <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-list>
    </q-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>
</q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import { Core } from '../store/core'
import { Auth } from '../store/auth'
import { bluetooth }from '../plugins/ble'
import { Blex } from '../store/bluetooth'
const serviceUUID = '180d'
const characteristicUUID = '2a37'
const BLE:any = bluetooth
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
    // {
    //     title: 'Pace Zone',
    //     caption: 'Running in zone',
    //     icon: 'em em-man-running',
    //     link: '/app/pace'
    // },
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

}
</script>
