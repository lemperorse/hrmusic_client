import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from "./core";
import  {fb} from '../plugins/facebook'

let FB:any = fb
@Module({ generateMutationSetters: true })
class FacebookModules extends VuexModule {
    public USER:any = null
    public FACEBOOK_TOKEN = (localStorage.getItem('facebook_token'))?localStorage.getItem('facebook_token'):null
    async login() {   
        
       let loginning =  await FB.login(["public_profile", "user_birthday"], async (r: any) => {
            let data = r.authResponse 
            await localStorage.setItem('facebook_token',data.accessToken)
            await location.reload() 
            return true; 
        }, (e: any) => {
            alert(JSON.stringify(e))
            return null
        })  
        return loginning;
    }

    async getUserWhenLogin(){
        if(this.FACEBOOK_TOKEN){ 
            return await this.getProfile(this.FACEBOOK_TOKEN)
        }else {
            return null
        }
    }

    async getProfile(token:any){
        let user = await Core.getHttp(`https://graph.facebook.com/v11.0/me?fields=id%2Cname%2Clast_name%2Cfirst_name%2Cpicture&access_token=${token}`)
        let formReg = {}
        let formLog = {}
        console.log(user);
        if(user.id){
            formReg = {
                first_name:  user.first_name,
                last_name: user.last_name,
                email:`${user.id}@facebook.com`,
                username:user.id,
                password:btoa(user.id),
                password_confirm:btoa(user.id)
            }

            formLog = {
                username:user.id,
                password:btoa(user.id),
            } 
            return {
                formReg:formReg,
                formLog:formLog
            }
           
        }
        return null
        
    }


}

import store from "./index"
export const Facebook = new FacebookModules({ store, name: "Facebook" })