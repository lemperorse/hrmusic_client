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
const BLE:any = bluetooth
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
        BLE.enable();

        BLE.startScan([serviceUUID], (device: any) => {
            console.log(JSON.stringify(device));
            this.list.push(device)
        }, (error: any) => {
            alert(JSON.stringify(error))

        });

        setTimeout(BLE.stopScan,
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
        await BLE.stopScan
        this.SCAN = false;
    }

    async connectDevice(device: any) {
        BLE.connect(device.id, async () => {
            this.CURRENT_DEVICE = device;
            await Blex.setDevice(device);
            alert('Connect Success')
            this.stopScan();
        }, () => { alert('Cannot Connect Device') })
    }

    async disConnectDevice(device: any) {
        BLE.disconnect(device.id, async() => {
            this.CURRENT_DEVICE = null;
            await Blex.removeDevice();
              localStorage.setItem('DEVICES', '');
            alert('Disconnect Success')
        }, () => { alert('Cannot Disconnect Device') })
    }
};
</script>

<style scoped>
.bg-hr {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='800' height='1300' preserveAspectRatio='none' viewBox='0 0 800 1300'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1027%26quot%3b)' fill='none'%3e%3crect width='420' height='420' clip-path='url(%26quot%3b%23SvgjsClipPath1028%26quot%3b)' x='395.24' y='-195.61' fill='url(%23SvgjsPattern1029)' transform='rotate(33.46%2c 605.24%2c 14.39)'%3e%3c/rect%3e%3crect width='439.76000000000005' height='439.76000000000005' clip-path='url(%26quot%3b%23SvgjsClipPath1030%26quot%3b)' x='-108.82' y='694.14' fill='url(%23SvgjsPattern1031)' transform='rotate(222.02%2c 111.06%2c 914.02)'%3e%3c/rect%3e%3cpath d='M652.81 895.18L646.47 884.06 655.93 875.43 649.59 864.3 659.05 855.67 652.7 844.55 662.16 835.92' stroke='rgba(90%2c 228%2c 232%2c 1)' stroke-width='1' stroke-dasharray='4%2c 4'%3e%3c/path%3e%3crect width='492' height='492' clip-path='url(%26quot%3b%23SvgjsClipPath1032%26quot%3b)' x='107.46' y='394.45' fill='url(%23SvgjsPattern1033)' transform='rotate(340.57%2c 353.46%2c 640.45)'%3e%3c/rect%3e%3crect width='60' height='60' clip-path='url(%26quot%3b%23SvgjsClipPath1034%26quot%3b)' x='526.5' y='25.3' fill='url(%23SvgjsPattern1035)' transform='rotate(94.49%2c 556.5%2c 55.3)'%3e%3c/rect%3e%3crect width='501.84' height='501.84' clip-path='url(%26quot%3b%23SvgjsClipPath1036%26quot%3b)' x='-62.47' y='615.81' fill='url(%23SvgjsPattern1037)' transform='rotate(3.73%2c 188.45%2c 866.73)'%3e%3c/rect%3e%3ccircle r='111.34830115422838' cx='22.56' cy='130.9' fill='rgba(144%2c 107%2c 232%2c 1)'%3e%3c/circle%3e%3crect width='410.24' height='410.24' clip-path='url(%26quot%3b%23SvgjsClipPath1038%26quot%3b)' x='162.99' y='439.37' fill='url(%23SvgjsPattern1039)' transform='rotate(136.92%2c 368.11%2c 644.49)'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1027'%3e%3crect width='800' height='1300' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1029'%3e%3cpath d='M0 6L3 0L6 6' stroke='rgba(144%2c 107%2c 232%2c 1)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1028'%3e%3ccircle r='105' cx='605.24' cy='14.39'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='9.56' height='9.56' patternUnits='userSpaceOnUse' id='SvgjsPattern1031'%3e%3cpath d='M0 9.56L4.78 0L9.56 9.56' stroke='%23037b0b' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1030'%3e%3ccircle r='109.94000000000001' cx='111.06' cy='914.02'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1033'%3e%3cpath d='M0 6L3 0L6 6' stroke='rgba(144%2c 107%2c 232%2c 1)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1032'%3e%3ccircle r='123' cx='353.46' cy='640.45'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern1035'%3e%3cpath d='M0 6L3 0L6 6' stroke='%23e73635' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1034'%3e%3ccircle r='15' cx='556.5' cy='55.3'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='13.94' height='13.94' patternUnits='userSpaceOnUse' id='SvgjsPattern1037'%3e%3cpath d='M6.97 1L6.97 12.94M1 6.97L12.94 6.97' stroke='rgba(90%2c 228%2c 232%2c 1)' fill='none' stroke-width='5.1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1036'%3e%3ccircle r='125.46' cx='188.45' cy='866.73'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='12.82' height='12.82' patternUnits='userSpaceOnUse' id='SvgjsPattern1039'%3e%3cpath d='M6.41 1L6.41 11.82M1 6.41L11.82 6.41' stroke='rgba(90%2c 228%2c 232%2c 1)' fill='none' stroke-width='3.01'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1038'%3e%3ccircle r='102.56' cx='368.11' cy='644.49'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
}
</style>
