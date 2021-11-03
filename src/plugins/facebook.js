
let FACECOOK_CONNECT = null
try {
  FACECOOK_CONNECT  = (facebookConnectPlugin)?facebookConnectPlugin:null

} catch (error) {
  FACECOOK_CONNECT  = null

}

const fb = FACECOOK_CONNECT

export { fb }