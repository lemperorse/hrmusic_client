<template>
<q-page class="  pt-6 bg-program">

    <div class="flex  pr-6 ">
        <q-btn size="xl" flat color="red" icon="west" @click="$router.go(-1)" />
        <q-space />
        <div class="text-right">
            <h1 :class="t" class="text-3xl font-bold"> {{program.name}}</h1>
              <span :class="`mb-1 text-${getColor(program.difficulty)}-600`">
                {{getDifficulty(program.difficulty)}}
                <i :class="`text-${getColor(program.difficulty)}-600`" class="mdi mdi-run-fast text-xl" aria-role="presentation" aria-label="TEAR-OFF CALENDAR"></i>
            </span><br>
            <span :class="t">{{program.description}}</span> <br>
          
        </div>
    </div>
    
    <div>
        <h2 class="text-xl">Running History</h2>
         
  <RunedGraph v-if="response"  />
  <br>
   <h2 class="text-xl">Zone Running Program</h2>
    
        <DurationGraph v-if="response" :durations="durations" />
          <DurationData v-if="response"   :durations="durations"  />
        

    </div>

</q-page>
</template>

 
<script lang="ts">
import RunedGraph from '../../components/Programs/RunedGraph.vue'

import { Vue, Component } from 'vue-property-decorator';
import { Core } from '../../store/core'
import { Auth } from '../../store/auth'
import DurationData from '../../components/Programs/DurationData.vue'
import DurationGraph from '../../components/Programs/DurationGraph.vue'
import _ from 'lodash'

@Component({ 
    components: {
        DurationData , DurationGraph, RunedGraph
    }
})
export default class ProgramPreview extends Vue {

    private user: any = Auth.user
    private program: any = {}
    private durations: any = []
    private response:boolean = false;
    async created() {
        await this.initialize();
        this.response = true;
    }

    async initialize() {
        let id = this.$route.query.id
        this.program = await Core.getHttp(`/api/exercise/program/${id}/`)
        this.durations = await Core.getHttp(`/api/exercise/duration/?program=${this.program.id}`)
        this.durations = _.orderBy(this.durations, 'no')

    }

    private dark: boolean = Core.DARK
    get t() {
        return (!this.dark) ? `text-black` : `text-white`
    }
    get bg() {
        return (!this.dark) ? `bg-black` : `bg-white`
    }
    get t_gray() {
        return (!this.dark) ? `text-gray-600` : `text-gray-300`
    }
    get t_gray_xl() {
        return (!this.dark) ? `text-black` : `text-gray-600`
    }

    getColor(difficulty: any) {
        if (difficulty == 1) {
            return 'green'
        } else if (difficulty == 2) {
            return 'blue'
        } else if (difficulty == 3) {
            return 'red'
        } else {
            return 'orange'
        }
    }

    getDifficulty(difficulty: any) {
        if (difficulty == 1) {
            return 'Easy'
        } else if (difficulty == 2) {
            return 'Moderate'
        } else if (difficulty == 3) {
            return 'Hard'
        } else {
            return 'Undefined'
        }
    }

};
</script>

<style>
.bg-program {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1078%26quot%3b)' fill='none'%3e%3ccircle r='79.14209576505503' cx='1283.51' cy='374.57' stroke='rgba(109%2c 116%2c 197%2c 1)' stroke-width='2.92' stroke-dasharray='4%2c 4'%3e%3c/circle%3e%3cpath d='M495.15 365.82a5.6 5.6 0 1 0-1.86 11.04 5.6 5.6 0 1 0 1.86-11.04zM492.49 381.6a5.6 5.6 0 1 0-1.86 11.04 5.6 5.6 0 1 0 1.86-11.04zM489.83 397.37a5.6 5.6 0 1 0-1.86 11.05 5.6 5.6 0 1 0 1.86-11.05zM487.18 413.15a5.6 5.6 0 1 0-1.86 11.05 5.6 5.6 0 1 0 1.86-11.05zM484.68 331.6a5.6 5.6 0 1 0-1.86 11.05 5.6 5.6 0 1 0 1.86-11.05zM482.03 347.38a5.6 5.6 0 1 0-1.86 11.05 5.6 5.6 0 1 0 1.86-11.05zM479.37 363.16a5.6 5.6 0 1 0-1.86 11.04 5.6 5.6 0 1 0 1.86-11.04zM476.71 378.94a5.6 5.6 0 1 0-1.86 11.04 5.6 5.6 0 1 0 1.86-11.04zM474.22 297.39a5.6 5.6 0 1 0-1.86 11.05 5.6 5.6 0 1 0 1.86-11.05zM471.56 313.17a5.6 5.6 0 1 0-1.86 11.04 5.6 5.6 0 1 0 1.86-11.04zM468.91 328.95a5.6 5.6 0 1 0-1.86 11.04 5.6 5.6 0 1 0 1.86-11.04zM466.25 344.73a5.6 5.6 0 1 0-1.86 11.04 5.6 5.6 0 1 0 1.86-11.04z' stroke='rgba(109%2c 116%2c 197%2c 1)' stroke-width='1'%3e%3c/path%3e%3cpath d='M50.73 462.31a5.6 5.6 0 1 0 9.68 5.64 5.6 5.6 0 1 0-9.68-5.64zM64.56 470.36a5.6 5.6 0 1 0 9.68 5.63 5.6 5.6 0 1 0-9.68-5.63zM78.39 478.41a5.6 5.6 0 1 0 9.68 5.63 5.6 5.6 0 1 0-9.68-5.63zM92.21 486.45a5.6 5.6 0 1 0 9.69 5.63 5.6 5.6 0 1 0-9.69-5.63z' fill='rgba(106%2c 155%2c 109%2c 1)'%3e%3c/path%3e%3cpath d='M1260.78 149.61L1256.39 161.64 1243.69 160 1239.3 172.03 1226.6 170.39 1222.22 182.42 1209.51 180.78' stroke='%23d3b714' stroke-width='1'%3e%3c/path%3e%3crect width='300' height='300' clip-path='url(%26quot%3b%23SvgjsClipPath1079%26quot%3b)' x='999.87' y='353.39' fill='url(%23SvgjsPattern1080)' transform='rotate(278.71%2c 1149.87%2c 503.39)'%3e%3c/rect%3e%3crect width='216' height='216' clip-path='url(%26quot%3b%23SvgjsClipPath1081%26quot%3b)' x='-83.73' y='181.96' fill='url(%23SvgjsPattern1082)' transform='rotate(291.51%2c 24.27%2c 289.96)'%3e%3c/rect%3e%3cpath d='M843.57 424.21a5.6 5.6 0 1 0-1.28-11.12 5.6 5.6 0 1 0 1.28 11.12zM841.74 408.32a5.6 5.6 0 1 0-1.28-11.13 5.6 5.6 0 1 0 1.28 11.13zM839.91 392.42a5.6 5.6 0 1 0-1.28-11.12 5.6 5.6 0 1 0 1.28 11.12zM838.08 376.53a5.6 5.6 0 1 0-1.28-11.13 5.6 5.6 0 1 0 1.28 11.13zM863.13 454.17a5.6 5.6 0 1 0-1.28-11.12 5.6 5.6 0 1 0 1.28 11.12zM861.3 438.28a5.6 5.6 0 1 0-1.28-11.13 5.6 5.6 0 1 0 1.28 11.13zM859.47 422.38a5.6 5.6 0 1 0-1.28-11.12 5.6 5.6 0 1 0 1.28 11.12zM857.64 406.49a5.6 5.6 0 1 0-1.28-11.13 5.6 5.6 0 1 0 1.28 11.13z' fill='rgba(106%2c 155%2c 109%2c 1)'%3e%3c/path%3e%3ccircle r='72.28339863403416' cx='693.12' cy='19.66' fill='%23e73635'%3e%3c/circle%3e%3cpath d='M401.63 338.28L394.07 348.62 382.32 343.51 374.76 353.84 363.02 348.74 355.46 359.07 343.71 353.96M399.54 330.56L391.98 340.9 380.23 335.79 372.67 346.12 360.93 341.01 353.37 351.35 341.62 346.24' stroke='rgba(109%2c 116%2c 197%2c 1)' stroke-width='1'%3e%3c/path%3e%3crect width='281.76' height='281.76' clip-path='url(%26quot%3b%23SvgjsClipPath1083%26quot%3b)' x='307.43' y='-12.02' fill='url(%23SvgjsPattern1084)' transform='rotate(344.72%2c 448.31%2c 128.86)'%3e%3c/rect%3e%3crect width='168' height='168' clip-path='url(%26quot%3b%23SvgjsClipPath1085%26quot%3b)' x='409.55' y='-62.44' fill='url(%23SvgjsPattern1086)' transform='rotate(241.49%2c 493.55%2c 21.56)'%3e%3c/rect%3e%3cpath d='M1196.24 175.74L1198.55 188.33 1186.76 193.35 1189.07 205.94 1177.29 210.96 1179.59 223.56 1167.81 228.57M1189.19 171.95L1191.5 184.54 1179.72 189.56 1182.02 202.15 1170.24 207.17 1172.55 219.77 1160.77 224.78M1182.15 168.15L1184.46 180.75 1172.67 185.77 1174.98 198.36 1163.2 203.38 1165.5 215.98 1153.72 220.99' stroke='%23d3b714' stroke-width='1.81' stroke-dasharray='4%2c 4'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1078'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='300' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1080'%3e%3crect width='300' height='3' x='0' y='0' fill='rgba(109%2c 116%2c 197%2c 1)'%3e%3c/rect%3e%3crect width='300' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1079'%3e%3ccircle r='75' cx='1149.87' cy='503.39'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1082'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='rgba(106%2c 155%2c 109%2c 1)' fill='none' stroke-width='1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1081'%3e%3ccircle r='54' cx='24.27' cy='289.96'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='11.74' height='11.74' patternUnits='userSpaceOnUse' id='SvgjsPattern1084'%3e%3cpath d='M0 11.74L5.87 0L11.74 11.74' stroke='%23e73635' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1083'%3e%3ccircle r='70.44' cx='448.31' cy='128.86'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1086'%3e%3cpath d='M0 6L3 0L6 6' stroke='rgba(109%2c 116%2c 197%2c 1)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1085'%3e%3ccircle r='42' cx='493.55' cy='21.56'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
}
</style>
