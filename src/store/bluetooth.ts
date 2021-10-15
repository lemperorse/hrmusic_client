import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from "./core";
import { bluetooth } from '../plugins/ble'

const serviceUUID = '180d'
const characteristicUUID = '2a37'
const BLE:any = bluetooth
@Module({ generateMutationSetters: true })
class BlexModule extends VuexModule {

    public DEVICE: any = null
    public DATA: any = 0

    public async connectDevice(device: any) {
      BLE.enable();
      BLE.connect(device.id, async () => {
          this.DEVICE = device;
          await this.setDevice(device);
          alert('Connect Current Device Success') 
          await BLE.stopScan
      }, () => { alert('Cannot Connect Device') })
  }

    public async getConnectOld() {
      let oldDevice:any = localStorage.getItem('DEVICES')
      oldDevice = JSON.parse(oldDevice)
      if(oldDevice.id){
        await this.connectDevice(oldDevice)
       // await this.setDevice(oldDevices)
        await this.startNotify();
      }
   
    }

    public async setDevice(device: any) {
        this.DEVICE = device
        localStorage.setItem('DEVICES', JSON.stringify(device));

    }

    public async removeDevice() {
        this.DEVICE = null
    }

    public async startNotify() {
        if (this.DEVICE) {
            console.log('start read data')
            let ble = bluetooth
            BLE.startNotification(this.DEVICE.id, serviceUUID, characteristicUUID,
                (result: any) => {

                    console.dir(result)
                    var data = new Uint8Array(result)
                    this.DATA = data[1]
                }, () => {
                })
        }
    }

    public async stopNotify() {
        let ble = bluetooth
        if (this.DEVICE != null) { 
          BLE.stopNotification(
            this.DEVICE.id,
            serviceUUID,
            characteristicUUID,
            () => { 
                this.DATA = null
              console.log('stop notification success')
            },
            () => {
              console.log('stop notification failed')
            }
          )
        }else{
          
        } 
    }





}

import store from "./index"
export const Blex = new BlexModule({ store, name: "Blex" })