import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from "./core";
import { bluetooth } from '../plugins/ble'

const serviceUUID = '180d'
const characteristicUUID = '2a37'

@Module({ generateMutationSetters: true })
class BlexModule extends VuexModule {

    public DEVICE: any = null
    public DATA: any = 0

    public getConnect() {

    }

    public async setDevice(device: any) {
        this.DEVICE = device
    }

    public async removeDevice() {
        this.DEVICE = null
    }

    public async startNotify() {
        if (this.DEVICE) {
            console.log('start read data')
            let ble = bluetooth
            ble.startNotification(this.DEVICE.id, serviceUUID, characteristicUUID,
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
          ble.stopNotification(
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