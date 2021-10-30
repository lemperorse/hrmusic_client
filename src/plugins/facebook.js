
let fb = null
try {
  fb  = (facebookConnectPlugin)?facebookConnectPlugin:null

} catch (error) {
    fb  = {}

}

export { fb }