<template>
<q-page class="bg-main">

    <div class="flex flex-col   p-4  ">
        <div class="flex w-full">
            <q-btn flat color="primary" icon="west" label="Back " @click="$router.go(-1)" />
            <q-space />
            <q-btn flat class="flex  " :class="t">
                <i class="em em-hearts" aria-role="presentation" aria-label="BLACK HEART SUIT"></i>
                <span class="ml-2">{{bleData}} bpm </span>
            </q-btn>
           
        </div>
    </div>
    <gmap-map :options="{streetViewControl : false,}" :center="center" :zoom="15" ref="mainmap" style="width: 100%; height: 16rem" class="mrt-10">
        <gmap-polyline :path="path" :editable="false" ref="polyline" />

        <gmap-marker :position="center" :clickable="true" :draggable="false"></gmap-marker>
    </gmap-map>

    <div class="p-4">
        <div class="flex w-full">
            <div>
                <h2 :class="t" class="text-sm">{{myGoal.race_date}}</h2>
                <h2 :class="t" class="font-bold text-xl">{{myPlan.name}} </h2>
            </div>
            <q-space />
            <q-btn v-if="!detecting" @click="startDetect()" color="primary" icon="check" label="Start" />
            <q-btn v-else @click="stopDectect()" color="red" icon="check" label="Stop" />
        </div>

        <div class="w-full p-2 ">
            <q-item :class="bg" class="rounded-xl border-1 bg-gray-200 shadow-xl">
                <q-item-section avatar>
                    <i class="em em-timer_clock text-4xl" aria-role="presentation" aria-label=""></i>
                </q-item-section>
                <q-item-section>
                    <q-item-label caption>
                        <h3 class="text-sm font-semibold">Total Time : {{time}}</h3>
                        <h3 class="text-sm font-semibold">Round Time : {{inTime}} (Zone {{currentZone}})</h3>
                        <h2 v-if="currentZone == 1"   class="text-green-600 text-sm font-semibold">Your Speed in Zone 1: {{user.my_place_zone1}} km/min </h2>
                        <h2 v-if="currentZone == 2" class="text-green-600  text-sm font-semibold">Your Zone 2 : {{user.my_place_zone1}} km/min </h2>
                        <h2 v-if="currentZone == 3" class="text-green-600  text-sm font-semibold">Your Zone 3: {{user.my_place_zone1}} km/min </h2>
                        <h2 v-if="currentZone == 4" class="text-green-600 text-sm font-semibold">Your Zone 4: {{user.my_place_zone1}} km/min </h2>
                        <span class="text-green-600 text-sm font-semibold" >Of {{user.my_place_race}} km</span>
                
                    </q-item-label>
                </q-item-section>
            </q-item>
        </div>

    </div>

    <div class="flex flex-col justify-center items-center " v-if="!detecting">

    </div>

    <div class="flex flex-col justify-center items-center  " v-else>
        <div class="w-32 h-32 flex flex-col justify-center items-center rounded-full border border-red-500 mt-4">
            <i class="em em-heart text-4xl" aria-role="presentation" aria-label="HEAVY BLACK HEART"></i>
            <h2 :class="t" class="text-xl">{{bleData}} bpm</h2>
        </div>
        <div class="p-2 flex w-full justify-center items-center mt-4">
            <div class="w-6/12 p-2 ">
                <q-item :class="bg " class="rounded-xl border-1 bg-gray-200 ">
                    <q-item-section avatar>
                        <i class="em em-round_pushpin  text-4x" aria-role="presentation" aria-label="ROUND PUSHPIN"></i>

                    </q-item-section>
                    <q-item-section>
                        <q-item-label :class="t">Round</q-item-label>
                        <q-item-label caption>
                            <span :class="t" class="text-xl font-bold  "> {{round}} / {{durations.length}}</span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div>
            <div class="w-6/12 p-2 ">
                <q-item :class="bg " class="rounded-xl border-1 bg-gray-200">
                    <q-item-section avatar>
                        <i class="em em-repeat text-4xl" aria-role="presentation" aria-label="CLOCKWISE RIGHTWARDS AND LEFTWARDS OPEN CIRCLE ARROWS"></i>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label :class="t">Replete</q-item-label>
                        <q-item-label caption>
                            <span :class="t" class="text-xl font-bold  "> {{currentReps}} /{{reps}} </span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div>
            <!-- <div class="w-12/12 p-2 ">
                <q-item :class="bg " class="rounded-xl border-1 bg-gray-200">
                    <q-item-section avatar>
                        <i class="em em-man-running  text-4xl" aria-role="presentation" aria-label=""></i>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label :class="t">Zone</q-item-label>
                        <q-item-label caption>
                            <span :class="t" class="text-xl font-bold  "> {{zone}}</span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div> -->

        </div>
        <div class="p-2 flex w-full justify-center items-center ">
            <div class="w-7/12  p-2">
                <q-item :class="bg " class="rounded-xl border-1 bg-gray-200">
                    <q-item-section avatar>
                        <i class="em em-heartbeat text-4xl" aria-role="presentation" aria-label="BEATING HEART"></i>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label><span :class="t" class="text-xs">Music / Hrart</span></q-item-label>
                        <q-item-label caption>
                            <span :class="t" class="text-base font-bold  "> 80/70 <span class="font-thin text-xs">bpm.</span></span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div>
            <div class="w-5/12 p-2 ">
                <q-item :class="bg " class="rounded-xl border-1 bg-gray-200">
                    <q-item-section avatar>
                        <i class="em em-man-running  text-4xl" aria-role="presentation" aria-label=""></i>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label :class="t">Zone</q-item-label>
                        <q-item-label caption>
                            <span :class="t" class="text-xl font-bold  "> {{zone}}</span>
                         
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div>
            <div class="w-full p-2 "  >
                <q-item :class="bg " class="rounded-xl border-1  ">
                    <q-item-section avatar>
                        <i class="em em-musical_note text-4xl" aria-role="presentation" aria-label="MUSICAL NOTE"></i>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label :class="t">Music</q-item-label>
                        <q-item-label caption>
                            <span :class="t" class="text-base font-bold  "> Super Bass-Nicki minaj</span>
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
import {
    Vue,
    Component
} from 'vue-property-decorator';
import Map from '../../components/Map.vue'
import {
    Blex
} from '../../store/bluetooth'
import {
    Core
} from '../../store/core'
import {
    Auth
} from '../../store/auth'
import {
    Exercise
} from '../../store/exercise'

import moment from 'moment'
import countdown from 'countdown'
import Swal from 'sweetalert2'

import {
    Loading,
    QSpinnerGears
} from 'quasar'

@Component({
    components: {
        Map
    }
})
export default class PageIndex extends Vue {

    private detecting: boolean = false
    private detect: any = {}
    private runMainForm: any = {}
    private runMain: any = {}
    private zone: Number = 0
    private time: any = '00:00:00'
    private inTime: any = '00:00:00'
    private round: any = 0
    private currentZone: any = 0
    private reps: number = 0
    private currentReps: number = 0
    private user:any = Auth.user

    async createdRunMain() {
        await Loading.hide()

        let main = await Core.getHttp(`/api/exercise/run/main/?user=${Auth.user.id}&goal=${this.myGoal.id}&plan=${this.myGoal.plan.id}&program=${this.$route.query.id}`)
        if (main.length == 0) {
            this.runMainForm = {
                "discription": "",
                "passing": true,
                "user": Auth.user.id,
                "goal": this.myGoal.id,
                "plan": this.myGoal.plan.id,
                "program": Number(this.$route.query.id)
            }
            let runMain = await Core.postHttp(`/api/exercise/run/main/`, this.runMainForm)
            this.runMain = runMain
        } else {
            this.runMain = main[0]
        }
        await this.startProgram();
    }

    async startProgram() {
        this.durations.forEach((duartion: any) => {
            var now = moment(); // new Date().getTime();
            var then = moment().add(60, 'seconds'); // new Date(now + 60 * 1000);

            console.log(moment(now).format('h:mm:ss a'));
            console.log(moment(then).format('h:mm:ss a'));
            console.log(moment(now).to(then));
            let data = countdown(new Date(2021, 0, 1, 2021, 0, 1, countdown.SECONDS)).toString();
            console.log('[]ss', data)

        });
    }

    timmer: number = 0
    async startDetect() {

        clearInterval(this.detect)
        await Loading.show({
            message: 'Starting Decection'
        })
        await Blex.startNotify()
        await this.sleep(2000);
        await Loading.hide()

        this.detecting = true

        for (let j = 0; j < this.durations.length; j++) {
            let setA = (this.hmsToSecondsOnly(this.durations[j].duration))
            let setB = (this.hmsToSecondsOnly(this.durations[j].rest_duration))
            let setAll = (setA + setB) // * this.durations[j].reps
            this.reps = this.durations[j].reps
            this.inTime = '00:00:00'
            this.$q.notify({
                color: "blue",
                message: `Rounded ${j+1} (Zone ${this.durations[j].place},${this.durations[j].rest})`,
                position: "center"
            })
            this.round = j + 1
            for (let i = 0; i < this.durations[j].reps; i++) {
                this.currentReps = (i + 1)
                for (let index = 0; index < setAll; index++) {
                    console.log(index);
                    console.log('[AB]', setA, setB, setAll, setAll * 1000);
                    let zone = await Exercise.getZone(this.bleData)
                    this.zone = (zone) ? zone : 0
                    if (zone) {
                        await this.storeResult(this.bleData, zone)
                    }
                    this.currentZone = this.durations[j].place
                    if (index == setA) {
                        console.log("Change Zone");
                        this.currentZone = this.durations[j].rest
                        // this.$q.notify({
                        //     message: "Change to Zone "+this.currentZone,
                        //     position: "center"
                        // })
                        Swal.fire({ 
                        icon: 'success',
                        title: "Change to Zone "+this.currentZone,
                        showConfirmButton: false,
                        timer: 1500
                        })
                    }
                    this.timmer = index
                    this.time = await moment(this.time, 'HH:mm:ss').add(1, 'second').format('HH:mm:ss');
                    this.inTime = await moment(this.inTime, 'HH:mm:ss').add(1, 'second').format('HH:mm:ss');

                    await this.sleep(1000);
                    if (!this.detecting) {
                        //this.inTime = '00:00:00'
                        break;
                    }
                }

                if(j == (this.durations.length-1)){
                       this.detecting = false
                       Swal.fire(
                        'Good job!',
                        'Finish Your Program',
                        'success'
                        )
                }
            }

        }
        this.detecting = false

    }
    async sleep(msec: any) {
        return new Promise(resolve => setTimeout(resolve, msec));
    }

    async stopDectect() {
        await Loading.show({
            message: 'Stopping Decection'
        })
        this.detecting = false
        await Blex.stopNotify()
        clearInterval(this.detect)
        setTimeout(async () => {
            console.log('[stop]');
            await Loading.hide()
        }, 2000);
        // await Loading.hide()
    }

    async storeResult(bpm: any, zone: any) {
        let data = {
            "hr_bpm": bpm,
            "hr_zone": zone,
            "music_bpm": bpm,
            "music_zone": zone,
            "music": "Test Music",
            "user": Auth.user.id,
            "run_main": this.runMain.id
        }
        await Core.postHttp(`/api/exercise/run/result/`, data)
        console.log('[result]', data)
    }

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

    private dark: boolean = Core.DARK 
    get t() {
        return (!this.dark) ? `text-black` : `text-white`
    }
    get bg() {
        return (this.dark) ? `bg-grey-10` : `bg-white`
    }
    get t_gray() {
        return (!this.dark) ? `text-gray-600` : `text-gray-300`
    }
    get t_gray_xl() {
        return (!this.dark) ? `text-black` : `text-gray-600`
    }

    listGoals: any = []
    listProgram: any = []
    response: boolean = false
    myPlan: any = {}
    myGoal: any = {}
    program: any = {}
    durations: any = []
    async created() {
        this.listGoals = await Core.getHttp(`/api/exercise/goalall/?user=${this.user.id}`)
        if (this.listGoals.length >= 1) {
            await this.getMyGoal()
            await this.getProgram()
            await this.createdRunMain()
            this.detecting = false
            this.response = true
        }
    }

    async getProgram() {
        this.program = await Core.getHttp(`/api/exercise/program/${this.$route.query.id}/`)
        this.durations = this.program.durations
        console.log(this.durations)
    }

    async getMyGoal() {

        this.myGoal = this.listGoals[this.listGoals.length - 1]
        this.myPlan = this.myGoal.plan
        this.listProgram = this.myPlan.program
        let dateSource = moment(this.myGoal.race_date).subtract(this.listProgram.length, 'days');
        this.myGoal.race_date_out = dateSource.format('YYYY/MM/DD')
        this.myGoal.race_date = moment(this.myGoal.race_date).format('YYYY/MM/DD')
    }

    hmsToSecondsOnly(str: any) {
        var p = str.split(':'),
            s = 0,
            m = 1;

        while (p.length > 0) {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }

        return s;
    }

};
</script>

<style>
.bg-main {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='800' height='1440' preserveAspectRatio='none' viewBox='0 0 800 1440'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1845%26quot%3b)' fill='none'%3e%3crect width='192' height='192' clip-path='url(%26quot%3b%23SvgjsClipPath1846%26quot%3b)' x='383.33' y='368.19' fill='url(%23SvgjsPattern1847)' transform='rotate(292.91%2c 479.33%2c 464.19)'%3e%3c/rect%3e%3cpath d='M56.26 636.51a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM40.29 637.49a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM24.32 638.47a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM8.35 639.45a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM87.23 618.59a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM71.26 619.57a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM55.29 620.54a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM39.32 621.52a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM118.19 600.67a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM102.22 601.64a5.6 5.6 0 1 0-11.18 0.69 5.6 5.6 0 1 0 11.18-0.69zM86.25 602.62a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68zM70.28 603.6a5.6 5.6 0 1 0-11.18 0.68 5.6 5.6 0 1 0 11.18-0.68z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M517.34 566.56a5.6 5.6 0 1 0 0.26-11.2 5.6 5.6 0 1 0-0.26 11.2zM517.72 550.56a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM518.1 534.57a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM518.48 518.57a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM532.57 598.93a5.6 5.6 0 1 0 0.26-11.2 5.6 5.6 0 1 0-0.26 11.2zM532.95 582.93a5.6 5.6 0 1 0 0.27-11.19 5.6 5.6 0 1 0-0.27 11.19zM533.33 566.94a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM533.71 550.94a5.6 5.6 0 1 0 0.27-11.19 5.6 5.6 0 1 0-0.27 11.19zM547.8 631.3a5.6 5.6 0 1 0 0.26-11.19 5.6 5.6 0 1 0-0.26 11.19zM548.18 615.31a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2zM548.56 599.31a5.6 5.6 0 1 0 0.27-11.19 5.6 5.6 0 1 0-0.27 11.19zM548.94 583.32a5.6 5.6 0 1 0 0.27-11.2 5.6 5.6 0 1 0-0.27 11.2z' stroke='%23d3b714' stroke-width='2.38' stroke-dasharray='2%2c 2'%3e%3c/path%3e%3crect width='264' height='264' clip-path='url(%26quot%3b%23SvgjsClipPath1848%26quot%3b)' x='-59.21' y='263.48' fill='url(%23SvgjsPattern1849)' transform='rotate(290.68%2c 72.79%2c 395.48)'%3e%3c/rect%3e%3crect width='312' height='312' clip-path='url(%26quot%3b%23SvgjsClipPath1850%26quot%3b)' x='-66.01' y='1000.6' fill='url(%23SvgjsPattern1851)' transform='rotate(122.86%2c 89.99%2c 1156.6)'%3e%3c/rect%3e%3crect width='144' height='144' clip-path='url(%26quot%3b%23SvgjsClipPath1852%26quot%3b)' x='265.49' y='-17.25' fill='url(%23SvgjsPattern1853)' transform='rotate(343.14%2c 337.49%2c 54.75)'%3e%3c/rect%3e%3ccircle r='66.66666666666667' cx='305.21' cy='1221.26' stroke='%23037b0b' stroke-width='2.98' stroke-dasharray='4%2c 4'%3e%3c/circle%3e%3crect width='192' height='192' clip-path='url(%26quot%3b%23SvgjsClipPath1854%26quot%3b)' x='252.97' y='320.33' fill='url(%23SvgjsPattern1855)' transform='rotate(258.34%2c 348.97%2c 416.33)'%3e%3c/rect%3e%3cpath d='M241.88 1157.97a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28zM232.91 1144.71a5.6 5.6 0 1 0-6.27-9.27 5.6 5.6 0 1 0 6.27 9.27zM223.95 1131.46a5.6 5.6 0 1 0-6.27-9.28 5.6 5.6 0 1 0 6.27 9.28zM214.99 1118.21a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28zM273.06 1175.51a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28zM264.09 1162.26a5.6 5.6 0 1 0-6.27-9.28 5.6 5.6 0 1 0 6.27 9.28zM255.13 1149a5.6 5.6 0 1 0-6.27-9.27 5.6 5.6 0 1 0 6.27 9.27zM246.17 1135.75a5.6 5.6 0 1 0-6.28-9.28 5.6 5.6 0 1 0 6.28 9.28z' fill='%23d3b714'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1845'%3e%3crect width='800' height='1440' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1847'%3e%3cpath d='M0 6L3 0L6 6' stroke='%23e73635' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1846'%3e%3ccircle r='48' cx='479.33' cy='464.19'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1849'%3e%3cpath d='M0 6L3 0L6 6' stroke='%23037b0b' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1848'%3e%3ccircle r='66' cx='72.79' cy='395.48'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='312' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1851'%3e%3crect width='312' height='3' x='0' y='0' fill='rgba(144%2c 107%2c 232%2c 1)'%3e%3c/rect%3e%3crect width='312' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1850'%3e%3ccircle r='78' cx='89.99' cy='1156.6'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1853'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='%23d3b714' fill='none' stroke-width='1.1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1852'%3e%3ccircle r='36' cx='337.49' cy='54.75'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='192' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1855'%3e%3crect width='192' height='3' x='0' y='0' fill='%23d3b714'%3e%3c/rect%3e%3crect width='192' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1854'%3e%3ccircle r='48' cx='348.97' cy='416.33'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
}
</style>
