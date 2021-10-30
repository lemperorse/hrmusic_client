
let bluetooth = null
try {
    bluetooth = ble
} catch (error) {
    bluetooth = null
}
export { bluetooth }