import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from '../store/core'
import axios from '../plugins/axios'
import { Alert } from '../store/alert'
@Module({ generateMutationSetters: true })
class AuthModule extends VuexModule {
  private token: any = localStorage.getItem('token')
  public user: any = null

  public async setUser() {
    let user = await Core.getHttp(`/auth-reg/profile/`)
    this.user = user;
    return user;
  }

  public async getUser() {
    let user = await Core.getHttp(`/auth-reg/profile/`)

    return user;
  }

  public async login(form: any,alert:boolean = true) {
    await this.reToken();
    let user = await Core.postHttp(`/auth/login/`, form)
    if (user.key) {
      let key = user.key
      console.log(key);
      await this.storeToken(key)
      await this.storeTokenToStorage(key)
      //  await window.location.replace("/");
      return key
    } else {
      if(alert){
        Alert.openAlert("error", 'ไม่สามารถเข้าสู่ระบบได้', 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง')
      }
      return false;
   
      // alert('ไม่สามารถเข้าสู่ระบบได้กรุณาตรวจสอบข้อมูลให้ถูกต้อง')
    }
  }

  public async reToken() {
    axios.defaults.headers.common['Authorization'] = '';
  }

  public async storeToken(token: any) {
    console.log(token);
    axios.defaults.headers.common['Authorization'] = (token != null) ? `Token ${token}` : '';
  }

  public async storeTokenToStorage(token: any) {
    localStorage.setItem('token', token)
  }

  public async checkToken() {
    if (this.token != null) {
      await this.storeToken(this.token);
    }
  }

  public async checkUser() {
    // if(!this.user.id){
    //   await window.location.replace("/auth/login");
    // }
  }


  public async logout() {
    localStorage.clear();
    return await Core.postHttp('/auth/logout/', {})
  }
}

import store from "./index"
export const Auth = new AuthModule({ store, name: "Auth" })