<template>
<q-page class="bg-main">
    <gmap-map :options="{streetViewControl : false,}" :center="center" :zoom="15" ref="mainmap" style="width: 100%; height: 16rem" class="mrt-10">
        <gmap-polyline :path="path" :editable="false" ref="polyline" />

        <gmap-marker :position="center" :clickable="true" :draggable="false"></gmap-marker>
    </gmap-map>

    <div class="p-4">
        <h2 class="text-sm">Mon 17 Sep 2021</h2>
        <h2 class="font-bold text-xl">Running Detail</h2>
    </div>
    <div class="flex flex-col justify-center items-center  ">

        <div class="w-32 h-32 flex flex-col justify-center items-center rounded-full border border-red-500">
            <i class="em em-heart text-4xl" aria-role="presentation" aria-label="HEAVY BLACK HEART"></i>
            <h2 class="text-xl">{{bleData}} bpm</h2>
        </div>

        <div class="p-2 flex w-full justify-center items-center ">
            <div class="w-1/2  p-2">
                <q-item class="rounded-xl border-1 bg-gray-200">
                    <q-item-section avatar>
                        <i class="em em-heartbeat text-4xl" aria-role="presentation" aria-label="BEATING HEART"></i>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Music BPM</q-item-label>
                        <q-item-label caption>
                            <span class="text-xl font-bold text-black"> 80</span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div>
            <div class="w-1/2 p-2 ">
                <q-item class="rounded-xl border-1 bg-gray-200">
                    <q-item-section avatar>
                        <i class="em em-man-running  text-4xl" aria-role="presentation" aria-label=""></i>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Place Zone</q-item-label>
                        <q-item-label caption>
                            <span class="text-xl font-bold text-black"> 2</span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div>
            <div class="w-full p-2 ">
                <q-item class="rounded-xl border-1 bg-gray-200">
                    <q-item-section avatar>
                        <i class="em em-musical_note text-4xl" aria-role="presentation" aria-label="MUSICAL NOTE"></i>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Music</q-item-label>
                        <q-item-label caption>
                            <span class="text-base font-bold text-black"> Super Bass-Nicki minaj</span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div>

        </div>

    </div>

</q-page>
</template>

<script>

</script><script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Blex } from '../../store/bluetooth'

@Component({
    components: {}
})
export default class PageIndex extends Vue {
    get bleData() {
        return Blex.DATA
    }
    get DEVICE() {
        return Blex.DEVICE
    }
    center: any = {
        lat: 19.0331162,
        lng: 99.8967806,
    }

    path: any = [{
        lat: 19.0331162,
        lng: 99.8967806,
    }, {
        lat: 19.0479638,
        lng: 99.8753085
    }]

};
</script>

<style>

</style>
