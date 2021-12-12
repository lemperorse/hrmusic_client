import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";

import Swal, { SweetAlertOptions } from 'sweetalert2';

@Module({ generateMutationSetters: true })
class ExerciseModule extends VuexModule {

    async getZone(bpm:number){
        if(bpm >=90 && bpm <=108){
            return 1
        }else if(bpm >=90 && bpm <=108){
            return 2
        }else if(bpm >=90 && bpm <=108){
            return 3
        }else if(bpm >=90 && bpm <=108){
            return 4
        }else {
            return null
        }
    }
 
}
import store from "./index"
export const Exercise = new ExerciseModule({ store, name: "Exercise" })