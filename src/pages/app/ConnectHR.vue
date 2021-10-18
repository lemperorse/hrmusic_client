<template>
<q-page class="bg-hr">
    <div class="flex flex-col justify-center items-center p-4">
        <div class="w-32 h-32 flex flex-col justify-center items-center rounded-full border border-pink-500  ">

            <i class="em em-revolving_hearts text-4xl" aria-role="presentation" aria-label="REVOLVING HEARTS"></i>
            <i class="mdi mdi-bluetooth text-2xl text-purple-600" aria-role="presentation" aria-label="HEAVY BLACK HEART"></i>
            <!-- <h2 class="text-xl">70 bpm</h2> -->
        </div><br>
        <h2 class="text-3xl">Heart Rate</h2>
        <h2 class="text-xl"> Connect Devices</h2>
        <br>

        <div class="w-full  p-2" v-if="DEVICE">
            <h2 class="text-base">Device is Connectd.</h2>
            <q-item class="rounded-xl border-1 bg-gray-100">
                <div v-if="bleData" class="h-20 w-20 border-2 border-red-200 rounded-full flex justify-center items-center">
                    <span class="font-bold">{{bleData}}</span>  <span class="text-sm">bpm</span>
                </div>
                <q-item-section avatar v-else>
                    <i class="em em-heartbeat text-4xl" aria-role="presentation" aria-label="BEATING HEART"></i>
                </q-item-section>
                <q-item-section class="ml-2">
                    <q-item-label class="font-bold"> {{DEVICE.name}}</q-item-label>
                    <q-item-label caption>
                        <span class="text-base  text-black"> {{DEVICE.id}}</span>
                    </q-item-label>
                    <div class="flex ">
                        <q-btn v-if="!bleData" @click="blex.startNotify()" dense color="green" icon="mdi-motion-play" />
                        <q-btn v-if="bleData" @click="blex.stopNotify()" dense color="orange" icon="mdi-stop-circle" />
                        <q-btn class="ml-2" @click="disConnectDevice(DEVICE)" dense color="red" icon="mdi-bluetooth-off" label="Disconnect" />
                    </div>
                </q-item-section>
            </q-item> 
        </div>

        <div class="flex flex-row justify-around w-full">
            <q-btn v-if="!SCAN" class="m-1" dense style="width:40%;" @click="scanner()" outline color="primary" icon="mdi-bluetooth-connect" label="Scan" />
            <q-btn v-else class="m-1" dense style="width:40%;" @click="stopScan()" outline color="red" icon="mdi-block-helper" label="Stop" />

            <q-btn class="m-1" dense style="width:40%;" @click="list = []" outline color="primary" icon="mdi-share-circle" label="Clear Devices" />
        </div>

    </div>

    <div class="w-full  p-4" v-if="SCAN">

        <h2 class="text-base">List Devices Scanning..</h2>
        <q-item class="rounded-xl border-1 bg-gray-100 " v-for="(device,index) in list" :key='index'>
            <q-item-section avatar>
                <i class="em em-heartbeat text-4xl" aria-role="presentation" aria-label="BEATING HEART"></i>
            </q-item-section>
            <q-item-section>
                <q-item-label class="font-bold">{{device.name}}</q-item-label>
                <q-item-label caption>
                    <span class="text-base  text-black"> {{device.id}}</span>
                </q-item-label>
                <div>
                    <q-btn @click="connectDevice(device)" dense color="primary" icon="mdi-bluetooth-audio" label="Connect" />
                </div>
            </q-item-section>
        </q-item>
    </div>

</q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { bluetooth } from '../../plugins/ble'
import { Blex } from '../../store/bluetooth'
const serviceUUID = '180d'
const characteristicUUID = '2a37'
@Component({
    components: {}
})
export default class Bluetooth extends Vue {

    gg: any = cordova.plugins
    list: any = []
    SCAN: boolean = false;
    CURRENT_DEVICE: any = null
    blex: any = Blex
    get bleData() {
        return Blex.DATA
    }
    get DEVICE(){
        return Blex.DEVICE
    }
    async scanner() {
        this.SCAN = true;
        alert('Are You Sure to Scan');
        await navigator.geolocation.getCurrentPosition((r: any) => { console.log(r) }, (e: any) => { console.log(e) });
        bluetooth.enable();

        bluetooth.startScan([serviceUUID], (device: any) => {
            console.log(JSON.stringify(device));
            this.list.push(device)
        }, (error: any) => {
            alert(JSON.stringify(error))

        });

        setTimeout(bluetooth.stopScan,
            15000,
            () => {
                this.SCAN = false;
                alert("Scan complete");
            },
            () => {
                this.SCAN = false;
                alert("stopScan failed");
            }
        );
    }

    async stopScan() {
        await bluetooth.stopScan
        this.SCAN = false;
    }

    async connectDevice(device: any) {
        bluetooth.connect(device.id, async () => {
            this.CURRENT_DEVICE = device;
            await Blex.setDevice(device);
            alert('Connect Success')
            this.stopScan();
        }, () => { alert('Cannot Connect Device') })
    }

    async disConnectDevice(device: any) {
        bluetooth.disconnect(device.id, async() => {
            this.CURRENT_DEVICE = null;
            await Blex.removeDevice();
            alert('Disconnect Success')
        }, () => { alert('Cannot Disconnect Device') })
    }
};
</script>

<style scoped>

</style>
