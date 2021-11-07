<template>
<div >
    <div>
        <div class="flex w-full mt-6">
            <h2 :class="t" class=" text-xl font-semibold ">History Goals</h2>
            <q-space />
            <button @click="goalDialog = true" :class="(dark)?` bg-grey-10 text-gray-300`:` bg-yellow-500 text-white`" class="rounded-full   px-4 text-gray-300"> <span class="mdi mdi-eye pr-2"></span> View All</button>
        </div>

        <div class="mt-4  " v-if="response">
            <div :class="(dark)?` bg-grey-10 `:` bg-or text-white`" class="rounded shadow-xl  w-full m-2 mt-4 p-2 border-l-4 border-green-600" v-for="goal,i in listGoals" :key="i" v-if="i < 3">
                <div class="flex items-center "  @click="$router.push(`/app/calendar-preview?id=${goal.id}`)" >
                    <span class="em em-checkered_flag text-3xl" aria-role="presentation" aria-label="RUNNER"></span>
                    <div class="pl-3">
                        <div :class="t" class=" font-semibold   text-xl">
                            {{goal.plan.name}}
                        </div>
                        <div class="w-full mt-2 flex">
                            <span class="text-blue-600 text-xs font-medium  ">
                                <span class="font-semibold">End</span>: {{getDateEnd(goal)}}
                            </span>
                            <span class="pl-1 pr-1 text-xs text-gray-400">|</span>
                            <span class="text-yellow-600 text-xs font-medium  " v-if="goal.plan">{{goal.plan.program.length}} Programs</span>

                        </div>
                    </div>
                </div>
            </div>
            <br><br><br><br>

        </div>
    </div>

    <q-dialog v-model="goalDialog">
        <q-layout view="Lhh lpR fff" container class="bg-white">
            <q-header class="bg-primary">
                <q-toolbar>
                    <q-toolbar-title>History Goal</q-toolbar-title>

                    <q-btn @click="goalDialog = false" flat v-close-popup round dense icon="close" />
                </q-toolbar>
            </q-header>

            <q-page-container>
                <q-page padding  :class="(dark)?` bg-grey-10 `:` bg-or text-white`">

                    <q-list :dark="dark" bordered v-for="goal,n in listGoals" :key="n">
                        <q-item clickable v-ripple @click="$router.push(`/app/calendar-preview?id=${goal.id}`)">
                            <q-item-section>
                                <span :class="t" class="font-semibold">{{goal.plan.name}}</span>
                                <span  class="text-blue-600 text-xs font-medium  ">
                                    <span class="font-semibold">End</span>: {{getDateEnd(goal)}}
                                </span>
                            </q-item-section>
                            <q-item-section avatar>
                                <span class="text-yellow-600 text-xs font-medium  " v-if="goal.plan">{{goal.plan.program.length}} Programs</span>
                            </q-item-section>
                        </q-item>

                    </q-list>

                </q-page>
            </q-page-container>
        </q-layout>
    </q-dialog>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Blex } from '../../store/bluetooth'
import { Core } from '../../store/core'
import { Auth } from '../../store/auth'
import moment from 'moment'

@Component({
    components: {

    }
})
export default class Goal extends Vue {
    private dark: boolean = Core.DARK
    private user: any = Auth.user

    listGoals: any = []
    listProgram: any = []
    response: boolean = false
    myPlan: any = {}
    myGoal: any = {}
    goalDialog: boolean = false
    async created() {
        this.listGoals = await Core.getHttp(`/api/exercise/goalall/?user=${this.user.id}`)
        if (this.listGoals.length >= 1) {
            await this.getMyGoal()
            this.response = true
        }
    }

    async getMyGoal() {
        this.myGoal = this.listGoals[this.listGoals.length - 1]
        this.myPlan = this.myGoal.plan
        this.listProgram = this.myPlan.program
        let dateSource = moment(this.myGoal.race_date).subtract(this.listProgram.length, 'days');
        this.myGoal.race_date_out = dateSource.format('YYYY/MM/DD')
    }

    getDateEnd(goal: any) {
        let dateSource = moment(goal.race_date) //.format('YYYY/MM/DD') 
        let length = (goal.plan.program).length
        let outDate = moment(dateSource).subtract(length--, 'days');
        return outDate.format('YYYY/MM/DD')
    }

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
    get bleData() {
        return Blex.DATA
    }
    get DEVICE() {
        return Blex.DEVICE
    }

};
</script>

<style>
.bg-main {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='800' height='1440' preserveAspectRatio='none' viewBox='0 0 800 1440'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1845%26quot%3b)' fill='none'%3e%3crect width='192' height='192' clip-path='url(%26quot%3b%23SvgjsClipPath1846%26quot%3b)' x='383.33' y='368.19' fill='url(%23SvgjsPattern1847)' transform='rotate(292.91%2c 479.33%2c 464.19)'%3e%3c/rect%3e%3cpath d='M56.26 636.51a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM40.29 637.49a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM24.32 638.47a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM8.35 639.45a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM87.23 618.59a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM71.26 619.57a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM55.29 620.54a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM39.32 621.52a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM118.19 600.67a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM102.22 601.64a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM86.25 602.62a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM70.28 603.6a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M517.34 566.56a5.6 5.6 0 1 0 0.26-11.2 5.6 5.6 0 1 0-0.26 11.2zM517.72 550.56a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM518.1 534.57a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM518.48 518.57a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM532.57 598.93a5.6 5.6 0 1 0 0.26-11.2 5.6 5.6 0 1 0-0.26 11.2zM532.95 582.93a5.6 5.6 0 1 0 0.27-11.19 5.6 5.6 0 1 0-0.27 11.19zM533.33 566.94a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM533.71 550.94a5.6 5.6 0 1 0 0.27-11.19 5.6 5.6 0 1 0-0.27 11.19zM547.8 631.3a5.6 5.6 0 1 0 0.26-11.19 5.6 5.6 0 1 0-0.26 11.19zM548.18 615.31a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM548.56 599.31a5.6 5.6 0 1 0 0.27-11.19 5.6 5.6 0 1 0-0.27 11.19zM548.94 583.32a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2z' stroke='%23d3b714' stroke-width='2.38' stroke-dasharray='2%2c 2'%3e%3c/path%3e%3crect width='264' height='264' clip-path='url(%26quot%3b%23SvgjsClipPath1848%26quot%3b)' x='-59.21' y='263.48' fill='url(%23SvgjsPattern1849)' transform='rotate(290.68%2c 72.79%2c 395.48)'%3e%3c/rect%3e%3crect width='312' height='312' clip-path='url(%26quot%3b%23SvgjsClipPath1850%26quot%3b)' x='-66.01' y='1000.6' fill='url(%23SvgjsPattern1851)' transform='rotate(122.86%2c 89.99%2c 1156.6)'%3e%3c/rect%3e%3crect width='144' height='144' clip-path='url(%26quot%3b%23SvgjsClipPath1852%26quot%3b)' x='265.49' y='-17.25' fill='url(%23SvgjsPattern1853)' transform='rotate(343.14%2c 337.49%2c 54.75)'%3e%3c/rect%3e%3ccircle r='66.66666666666667' cx='305.21' cy='1221.26' stroke='%23037b0b' stroke-width='2.98' stroke-dasharray='4%2c 4'%3e%3c/circle%3e%3crect width='192' height='192' clip-path='url(%26quot%3b%23SvgjsClipPath1854%26quot%3b)' x='252.97' y='320.33' fill='url(%23SvgjsPattern1855)' transform='rotate(258.34%2c 348.97%2c 416.33)'%3e%3c/rect%3e%3cpath d='M241.88 1157.97a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28zM232.91 1144.71a5.6 5.6 0 1 0-6.27-9.27 5.6 5.6 0 1 0 6.27 9.27zM223.95 1131.46a5.6 5.6 0 1 0-6.27-9.28 5.6 5.6 0 1 0 6.27 9.28zM214.99 1118.21a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28zM273.06 1175.51a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28zM264.09 1162.26a5.6 5.6 0 1 0-6.27-9.28 5.6 5.6 0 1 0 6.27 9.28zM255.13 1149a5.6 5.6 0 1 0-6.27-9.27 5.6 5.6 0 1 0 6.27 9.27zM246.17 1135.75a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28z' fill='%23d3b714'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1845'%3e%3crect width='800' height='1440' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1847'%3e%3cpath d='M0 6L3 0L6 6' stroke='%23e73635' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1846'%3e%3ccircle r='48' cx='479.33' cy='464.19'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1849'%3e%3cpath d='M0 6L3 0L6 6' stroke='%23037b0b' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1848'%3e%3ccircle r='66' cx='72.79' cy='395.48'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='312' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1851'%3e%3crect width='312' height='3' x='0' y='0' fill='rgba(144%2c 107%2c 232%2c 1)'%3e%3c/rect%3e%3crect width='312' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1850'%3e%3ccircle r='78' cx='89.99' cy='1156.6'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1853'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='%23d3b714' fill='none' stroke-width='1.1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1852'%3e%3ccircle r='36' cx='337.49' cy='54.75'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='192' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1855'%3e%3crect width='192' height='3' x='0' y='0' fill='%23d3b714'%3e%3c/rect%3e%3crect width='192' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1854'%3e%3ccircle r='48' cx='348.97' cy='416.33'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
    background-attachment: fixed;
    background-size: cover;
}

.bg-u {
    background-color: #0E000E;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%2354190E' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23552118'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
}

.bg-c-c {
    background-color: #282828;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23171717'/%3E%3Cstop offset='1' stop-color='%23282828'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23202020'/%3E%3Cstop offset='1' stop-color='%23282828'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.shadow-dark {
    box-shadow: 1px 0px 31px 0px rgba(46, 46, 46, 0.75);
    -webkit-box-shadow: 1px 0px 31px 0px rgba(46, 46, 46, 0.75);
    -moz-box-shadow: 1px 0px 31px 0px rgba(46, 46, 46, 0.75);
}

.bg-c-c-w {
    background-color: #ee5522;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23FB3'/%3E%3Cstop offset='1' stop-color='%23ee5522'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23f7882b'/%3E%3Cstop offset='1' stop-color='%23ee5522'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.bg-or {
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23FF4F32'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>
