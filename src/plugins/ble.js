
let BLUETOOTH_CONNECT = null
try {
    BLUETOOTH_CONNECT = ble
} catch (error) {
    BLUETOOTH_CONNECT = null
}

const bluetooth = BLUETOOTH_CONNECT
export { bluetooth }