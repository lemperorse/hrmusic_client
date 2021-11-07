<template>
<q-page class="bg-calendar pt-6">

    <div class="flex  pr-6 ">
          <q-btn size="xl" flat color="red" icon="west"   @click="$router.go(-1)" />
        <q-space />
        <div class="text-right">
            <h1 :class="t"  class="text-3xl font-bold"> Preview Calendar</h1>
            <span :class="t"  >View Training Date</span>
        </div> 
    </div>
    
    <div class="flex flex-col justify-center items-center pt-4" v-if="response">
        <div class="mb-4 text-left w-full pl-11 bg-green-400">
            <div class="text-xl text-semibold">{{myPlan.name}}</div>
            <div>{{myPlan.coach_name}}</div>
            <div :class="t">
                <b :class="t">Finish : </b>{{myGoal.race_date_out}}
            </div>

        </div>
        <q-date :dark="dark" v-model="date" :options="options" :events="map(events,'date')" :event-color="(date) => findColor(date)" />

        <div v-for="(data, i) in events" :key="i" class="w-10/12 pl-6">
            <q-item :class="bg" class="rounded-xl border-1   shadow-xl mt-2">
                <q-item-section avatar>
                    <i :class="`text-${data.color}-600`" class="mdi mdi-run-fast text-xl" aria-role="presentation" aria-label="TEAR-OFF CALENDAR"></i>
                </q-item-section>
                <q-item-section @click="$router.push(`/app/program/preview/?id=${data.id}`)">
                    <!-- <q-item-label :class="`text-${data.color}-600`">{{ data.mode }} </q-item-label> -->
                    <q-item-label caption>
                        <span :class="`text-${data.color}-600`" class="text-base font-bold  ">
                            {{ data.name }}</span>
                        <br>
                        <span :class="`mb-1 text-${data.color}-600`">{{getDifficulty(data.difficulty)}}</span>
                        <hr>
                        <div class="flex">
                            <q-space />
                            <span :class="`mt-1 text-${data.color}-600`">{{data.date}}</span>
                        </div>

                    </q-item-label>
                </q-item-section>
            </q-item>

        </div>

    </div>
</q-page>
</template>

<script>
</script><script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import QCalendar from "@quasar/quasar-ui-qcalendar";
import * as _ from 'lodash'
import { Core } from '../../store/core'
import { Auth } from '../../store/auth'
import { Tool } from '../../store/tool'
import moment from 'moment'
@Component({
    components: {},
})
export default class Calendar extends Vue {
    response: boolean = false
    user: any = Auth.user
    myGoal: any = {}
    myPlan: any = {}
    listProgram: any = []
    listGoals: any = []

    date: any = moment().format('YYYY/MM/DD')
    events: any = []
    options: any = []
    async created() {
        let id = this.$route.query.id
        this.listGoals = await Core.getHttp(`/api/exercise/goalall/?id=${id}`)
        console.log('sssssssssss', this.listGoals)
        if (this.listGoals.length >= 1) {
            await this.getMyGoal()
            await this.generateData()
            this.response = true
        }
    }

    @Watch('date')
    public changeDate(dateValue: any) {
        console.log(dateValue)
        let data = _.find(this.events, { date: dateValue })
        if (data.id) {

        }

    }

    async getMyGoal() {
        this.myGoal = this.listGoals[this.listGoals.length - 1]
        this.myPlan = this.myGoal.plan
        this.listProgram = this.myPlan.program
    }

    async generateData() {

        let dateSource = moment(this.myGoal.race_date) //.format('YYYY/MM/DD')
        this.myGoal.race_date_out = dateSource.format('YYYY/MM/DD')
        let eventDate = []
        let length = this.listProgram.length
        for (let i = 0; i < this.listProgram.length; i++) {
            let outDate = moment(dateSource).subtract(length--, 'days');
            eventDate.push({
                id: this.listProgram[i].id,
                date: outDate.format('YYYY/MM/DD'),
                name: this.listProgram[i].name,
                color: this.getColor(this.listProgram[i].difficulty),
                difficulty: this.listProgram[i].difficulty
            })
        }
        console.log('[CCC]', eventDate);
        this.events = eventDate
        this.options = (_.map(eventDate, 'date')).concat(this.date)
        console.log(eventDate);

    }

    findColor(date: any) {
        return _.find(this.events, { 'date': date }).color
    }

    map(arr: any, map: string) {
        return _.map(arr, map)
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
}
</script>

<style scoped>
.bg-calendar {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='800' height='1300' preserveAspectRatio='none' viewBox='0 0 800 1300'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1731%26quot%3b)' fill='none'%3e%3crect width='461.16' height='461.16' clip-path='url(%26quot%3b%23SvgjsClipPath1732%26quot%3b)' x='-68.98' y='930.15' fill='url(%23SvgjsPattern1733)' transform='rotate(92.81%2c 161.6%2c 1160.73)'%3e%3c/rect%3e%3cpath d='M168.66 629.8a5.6 5.6 0 1 0 11.19 0.41 5.6 5.6 0 1 0-11.19-0.41zM184.64 630.38a5.6 5.6 0 1 0 11.2 0.42 5.6 5.6 0 1 0-11.2-0.42zM200.63 630.97a5.6 5.6 0 1 0 11.2 0.42 5.6 5.6 0 1 0-11.2-0.42zM216.62 631.56a5.6 5.6 0 1 0 11.2 0.41 5.6 5.6 0 1 0-11.2-0.41zM136.09 644.61a5.6 5.6 0 1 0 11.19 0.41 5.6 5.6 0 1 0-11.19-0.41zM152.08 645.2a5.6 5.6 0 1 0 11.19 0.41 5.6 5.6 0 1 0-11.19-0.41zM168.07 645.78a5.6 5.6 0 1 0 11.19 0.42 5.6 5.6 0 1 0-11.19-0.42zM184.06 646.37a5.6 5.6 0 1 0 11.19 0.42 5.6 5.6 0 1 0-11.19-0.42z' stroke='%23e73635' stroke-width='1' stroke-dasharray='3%2c 3'%3e%3c/path%3e%3ccircle r='81.32923032364639' cx='524.58' cy='892.02' fill='%23d3b714'%3e%3c/circle%3e%3crect width='422.4' height='422.4' clip-path='url(%26quot%3b%23SvgjsClipPath1734%26quot%3b)' x='16.12' y='385.79' fill='url(%23SvgjsPattern1735)' transform='rotate(169.81%2c 227.32%2c 596.99)'%3e%3c/rect%3e%3crect width='204' height='204' clip-path='url(%26quot%3b%23SvgjsClipPath1736%26quot%3b)' x='443.89' y='135.42' fill='url(%23SvgjsPattern1737)' transform='rotate(196.5%2c 545.89%2c 237.42)'%3e%3c/rect%3e%3crect width='336' height='336' clip-path='url(%26quot%3b%23SvgjsClipPath1738%26quot%3b)' x='-90.18' y='443' fill='url(%23SvgjsPattern1739)' transform='rotate(159.86%2c 77.82%2c 611)'%3e%3c/rect%3e%3ccircle r='66.66666666666667' cx='33.77' cy='392.71' fill='%23d3b714'%3e%3c/circle%3e%3crect width='96' height='96' clip-path='url(%26quot%3b%23SvgjsClipPath1740%26quot%3b)' x='-18.09' y='39.25' fill='url(%23SvgjsPattern1741)' transform='rotate(78.36%2c 29.91%2c 87.25)'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1731'%3e%3crect width='800' height='1300' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='10.98' height='10.98' patternUnits='userSpaceOnUse' id='SvgjsPattern1733'%3e%3cpath d='M0 10.98L5.49 0L10.98 10.98' stroke='%23e73635' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1732'%3e%3ccircle r='115.29' cx='161.6' cy='1160.73'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='9.6' height='9.6' patternUnits='userSpaceOnUse' id='SvgjsPattern1735'%3e%3cpath d='M0 9.6L4.8 0L9.6 9.6' stroke='%23037b0b' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1734'%3e%3ccircle r='105.6' cx='227.32' cy='596.99'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1737'%3e%3cpath d='M0 6L3 0L6 6' stroke='%23037b0b' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1736'%3e%3ccircle r='51' cx='545.89' cy='237.42'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='336' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1739'%3e%3crect width='336' height='3' x='0' y='0' fill='%23d3b714'%3e%3c/rect%3e%3crect width='336' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1738'%3e%3ccircle r='84' cx='77.82' cy='611'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1741'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='rgba(144%2c 107%2c 232%2c 1)' fill='none' stroke-width='1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1740'%3e%3ccircle r='24' cx='29.91' cy='87.25'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
}
</style>
