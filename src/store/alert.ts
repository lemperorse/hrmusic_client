import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";

import Swal, { SweetAlertOptions } from 'sweetalert2';

@Module({ generateMutationSetters: true })
class AlertModule extends VuexModule {

  public async openAlert(icon: any, title: string, text: string) {
    await Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: '#3085d6',
    })
  }
}
import store from "./index"
export const Alert = new AlertModule({ store, name: "Alert" })