<template>
<q-card  class="m-2 p-2 w-full" style="overflow-x: scroll">
    <div v-if="response" style="width:1080px">

        <VueApexCharts  v-if="response" type="line" height="350" width="100%" :options="chartOptions" :series="series"></VueApexCharts>
 
    </div>
</q-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import _ from 'lodash'
import { Core } from 'src/store/core'
import moment from 'moment'
export default {
    components: {
        VueApexCharts
    },
    props: {
        
    },
    data: () => {
        return ({
            raw:[],
               series:[],
       chartOptions: {
            chart: {
              height: 350,
              type: 'line'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
                 type: 'category',
              categories: []
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
           annotations: {
                    position: "front",
                    yaxis: [{
                            label: {
                                text: "Zone 1",
                                borderColor: '#00E396',
                                style: {
                                    fontSize: '14px',
                                    color: '#fff',
                                    background: '#00E396',
                                },
                            },
                            y: 90,
                            y2: 108,
                            fillColor: "rgba(71, 255, 47, 0.5)"
                        },
                        {
                            label: {
                                text: "Zone 2 ",
                                borderColor: '#ffff00',
                                style: {
                                    fontSize: '14px',
                                    color: '#400000',
                                    background: '#ffff00',
                                },
                            },
                            y: 108.1,
                            y2: 126,
                            fillColor: "rgba(249, 255, 47, 0.8)"
                        },
                        {
                            label: {
                                text: "Zone 3 ",
                                borderColor: '#ff8040',
                                 offsetY: 20,
                                style: {
                                    fontSize: '14px',
                                    color: '#fff',
                                    background: '#ff8040',
                                },
                            },
                            y: 126.1,
                            y2: 144,
                            fillColor: "rgba(300,120, 12, 0.8)",
                        },
                        {
                            label: {
                                text: "Zone 4 ",
                                borderColor: '#ff3c3c',
                                     offsetY: 50,
                                style: {
                                    fontSize: '14px',
                                    color: '#fff',
                                    background: '#ff3c3c',

                                },
                            },
                            y: 144.1,
                            y2: 162,
                            fillColor: 'rgba(207, 0, 0, 0.5)',
                        }
                    ]
                }
          },
          response:false
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

        async generateCharts(){
            let data = await Core.getHttp(`/api/exercise/run/main/${this.$route.query.main}/`) 
               if(data){
                 let hr = await _.map(data.result,(r)=>{return Number(r.hr_bpm)});
                 let music = await _.map(data.result,(r)=>{return Number(r.music_bpm)});
                 this.series = [
                     {  name: 'HR.',
                        data: hr,
                     },
                      {  name: 'Music',
                        data: music,
                     } ]
                 console.log(hr,music)
                    let cat = 0;
 
                let category = []
               for (let i=0; i< hr.length ; i++){

                   let time = moment().utcOffset(0).set({hour:0,minute:0,second:0,millisecond:0}).add(cat, 'minutes').format('HH:mm:ss') //.format('dd-MM-YYYY HH:mm:ss');

                   category.push(time.toString())

                   cat+=2
               }
               this.chartOptions.xaxis.categories = category
               console.log(category)
               }
        },

        
       
    }
}
</script>

<style>

</style>
