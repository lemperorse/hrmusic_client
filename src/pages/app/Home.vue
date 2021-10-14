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
            <div class="w-7/12  p-2">
                <q-item class="rounded-xl border-1 bg-gray-200">
                    <q-item-section avatar>
                        <i class="em em-heartbeat text-4xl" aria-role="presentation" aria-label="BEATING HEART"></i>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label><span class="text-xs">Music / Hrart</span></q-item-label>
                        <q-item-label caption>
                            <span class="text-base font-bold text-black"> 80/70 <span class="font-thin text-xs">bpm.</span></span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div>
            <div class="w-5/12 p-2 ">
                <q-item class="rounded-xl border-1 bg-gray-200">
                    <q-item-section avatar>
                        <i class="em em-man-running  text-4xl" aria-role="presentation" aria-label=""></i>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Zone</q-item-label>
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
<br><br>
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
.bg-main {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='800' height='1440' preserveAspectRatio='none' viewBox='0 0 800 1440'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1845%26quot%3b)' fill='none'%3e%3crect width='192' height='192' clip-path='url(%26quot%3b%23SvgjsClipPath1846%26quot%3b)' x='383.33' y='368.19' fill='url(%23SvgjsPattern1847)' transform='rotate(292.91%2c 479.33%2c 464.19)'%3e%3c/rect%3e%3cpath d='M56.26 636.51a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM40.29 637.49a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM24.32 638.47a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM8.35 639.45a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM87.23 618.59a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM71.26 619.57a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM55.29 620.54a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM39.32 621.52a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM118.19 600.67a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM102.22 601.64a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM86.25 602.62a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM70.28 603.6a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M517.34 566.56a5.6 5.6 0 1 0 0.26-11.2 5.6 5.6 0 1 0-0.26 11.2zM517.72 550.56a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM518.1 534.57a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM518.48 518.57a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM532.57 598.93a5.6 5.6 0 1 0 0.26-11.2 5.6 5.6 0 1 0-0.26 11.2zM532.95 582.93a5.6 5.6 0 1 0 0.27-11.19 5.6 5.6 0 1 0-0.27 11.19zM533.33 566.94a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM533.71 550.94a5.6 5.6 0 1 0 0.27-11.19 5.6 5.6 0 1 0-0.27 11.19zM547.8 631.3a5.6 5.6 0 1 0 0.26-11.19 5.6 5.6 0 1 0-0.26 11.19zM548.18 615.31a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM548.56 599.31a5.6 5.6 0 1 0 0.27-11.19 5.6 5.6 0 1 0-0.27 11.19zM548.94 583.32a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2z' stroke='%23d3b714' stroke-width='2.38' stroke-dasharray='2%2c 2'%3e%3c/path%3e%3crect width='264' height='264' clip-path='url(%26quot%3b%23SvgjsClipPath1848%26quot%3b)' x='-59.21' y='263.48' fill='url(%23SvgjsPattern1849)' transform='rotate(290.68%2c 72.79%2c 395.48)'%3e%3c/rect%3e%3crect width='312' height='312' clip-path='url(%26quot%3b%23SvgjsClipPath1850%26quot%3b)' x='-66.01' y='1000.6' fill='url(%23SvgjsPattern1851)' transform='rotate(122.86%2c 89.99%2c 1156.6)'%3e%3c/rect%3e%3crect width='144' height='144' clip-path='url(%26quot%3b%23SvgjsClipPath1852%26quot%3b)' x='265.49' y='-17.25' fill='url(%23SvgjsPattern1853)' transform='rotate(343.14%2c 337.49%2c 54.75)'%3e%3c/rect%3e%3ccircle r='66.66666666666667' cx='305.21' cy='1221.26' stroke='%23037b0b' stroke-width='2.98' stroke-dasharray='4%2c 4'%3e%3c/circle%3e%3crect width='192' height='192' clip-path='url(%26quot%3b%23SvgjsClipPath1854%26quot%3b)' x='252.97' y='320.33' fill='url(%23SvgjsPattern1855)' transform='rotate(258.34%2c 348.97%2c 416.33)'%3e%3c/rect%3e%3cpath d='M241.88 1157.97a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28zM232.91 1144.71a5.6 5.6 0 1 0-6.27-9.27 5.6 5.6 0 1 0 6.27 9.27zM223.95 1131.46a5.6 5.6 0 1 0-6.27-9.28 5.6 5.6 0 1 0 6.27 9.28zM214.99 1118.21a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28zM273.06 1175.51a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28zM264.09 1162.26a5.6 5.6 0 1 0-6.27-9.28 5.6 5.6 0 1 0 6.27 9.28zM255.13 1149a5.6 5.6 0 1 0-6.27-9.27 5.6 5.6 0 1 0 6.27 9.27zM246.17 1135.75a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28z' fill='%23d3b714'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1845'%3e%3crect width='800' height='1440' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1847'%3e%3cpath d='M0 6L3 0L6 6' stroke='%23e73635' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1846'%3e%3ccircle r='48' cx='479.33' cy='464.19'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1849'%3e%3cpath d='M0 6L3 0L6 6' stroke='%23037b0b' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1848'%3e%3ccircle r='66' cx='72.79' cy='395.48'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='312' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1851'%3e%3crect width='312' height='3' x='0' y='0' fill='rgba(144%2c 107%2c 232%2c 1)'%3e%3c/rect%3e%3crect width='312' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1850'%3e%3ccircle r='78' cx='89.99' cy='1156.6'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1853'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='%23d3b714' fill='none' stroke-width='1.1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1852'%3e%3ccircle r='36' cx='337.49' cy='54.75'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='192' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1855'%3e%3crect width='192' height='3' x='0' y='0' fill='%23d3b714'%3e%3c/rect%3e%3crect width='192' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1854'%3e%3ccircle r='48' cx='348.97' cy='416.33'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
}
</style>
