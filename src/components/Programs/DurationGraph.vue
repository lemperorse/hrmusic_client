<template>
<q-card  class="m-2 p-2 w-full"  style="overflow-x: scroll"> 
    <div v-if="response" :style="`width:${(length > 10)?1600:1080}px`">  
        <VueApexCharts  v-if="response" type="line" height="350" :options="chartOptions" :series="series"></VueApexCharts>

    </div>
</q-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { initial } from 'lodash'
import moment from'moment'
export default {
    components: {
        VueApexCharts
    },
    props: {
        durations: {
            default: []
        }
    },
    data: () => {
        return ({

            series: [],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'stepline'
                },
                title: {
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                },
                title: {
                    text: 'Zone',
                    align: 'left'
                },
                yaxis: {
                    min: 1,
                    max: 4,
                    labels: {

                        formatter: (value) => { return `${(value).toFixed(0)}` }, // just formats date to hh:mm format
                    },
                }
            },
            times:[],
            length:0,
            response: false,
        })
    },
    async mounted() {
        await this.initialize()
        this.response = true
    },
    methods: {
        async initialize() { 
            await this.generateCharts() 
        },
        async generateCharts() {
            let data = []
            let reps = []
            let time = []
            let allTime = 0
            let dataTime = moment('1996-05-16 00:00:00', 'YYYY-MM-DD HH:mm:ss')
            for (var i = 0; i < this.durations.length; i++) { 
                if(i == 0){
                        console.log(i)
                        time.push('00:00:00')
                    }
                for (var j = 0; j < this.durations[i].reps; j++) {  
                    data.push(this.durations[i].place)
                    data.push(this.durations[i].rest)
                    let inTime = this.getMin(this.durations[i].duration, this.durations[i].rest_duration)
                  
                    // let duration = Number(moment(`1996-05-16 ${this.durations[i].duration}`).format(`mm.ss`))   //this.getTmeToInt(this.durations[i].duration)
                    // let rest_duration = Number(moment(`1996-05-16 ${this.durations[i].rest_duration}`).format(`mm.ss`)) // this.getTmeToInt(this.durations[i].rest_duration)

                    let duration_min = Number(moment(`1996-05-16 ${this.durations[i].duration}`).format(`mm`))   
                    let duration_sec = Number(moment(`1996-05-16 ${this.durations[i].duration}`).format(`ss`))    
                    let rest_duration_min = Number(moment(`1996-05-16 ${this.durations[i].rest_duration}`).format(`mm`))  
                    let rest_duration_sec = Number(moment(`1996-05-16 ${this.durations[i].rest_duration}`).format(`ss`))  
                    
                    dataTime.add(duration_min, 'minutes').add(duration_sec, 'seconds') 
                    time.push((dataTime).format(`HH:mm:ss`))
                    this.times.push(dataTime.format(`HH:mm:ss`))
                    dataTime.add(rest_duration_min, 'minutes').add(rest_duration_sec, 'seconds')
                    time.push((dataTime).format(`HH:mm:ss`))
                    this.times.push(dataTime.format(`HH:mm:ss`)) 

                    // allTime += duration
                    // time.push(`${allTime} min`)
                    // allTime += rest_duration
                    // time.push(`${allTime} min`)
                    // var now = 

                    // dataTime.add(this.durations[i].duration)
                    // console.log(Number(now))
                    //  time.push(this.durations[i].duration)
                    //  time.push(this.durations[i].rest_duration)
                }

            }
            this.length = data.length
            this.series.push({
                name: "duration",
                data: data
            })

            console.log(data)
            this.chartOptions.xaxis.categories = time
            //this.times = time
            this.response = true

        },
        getTmeToInt(min) {
            let data = new Date(`2020-07-10 ` + min);
            return data.getMinutes();
        },
        getMin(minStart, minEnd) {
            let dateOne = new Date(`2020-07-10 ` + minStart);
            let dateTwo = new Date(`2020-07-10 ` + minEnd);
            let msDifference = dateTwo - dateOne;
            let minutes = Math.floor(msDifference / 1000 / 60);
            return minutes
        },
    }
}
</script>

<style>

</style>
