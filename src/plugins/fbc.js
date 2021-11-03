

let fb = null
try {
  fb  = (facebookConnectPlugin)?facebookConnectPlugin:null

} catch (error) {
    fb  = null

}

const arr = fb;
export { arr };