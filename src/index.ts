import { iQOSBattery } from "./interfaces/iqos";

export class iQOS {
    private bluetooth: Bluetooth;
    public device: (BluetoothDevice | undefined) = undefined;
    private server: (BluetoothRemoteGATTServer | undefined);
    private primaryService: (BluetoothRemoteGATTService | undefined);
    public battery: iQOSBattery = {
        serviceUUID: "ecdfa4c0-b041-11e4-8b67-0002a5d5c51b",
        service: undefined,
        case: undefined,
        holderReady: undefined
    }
    /**
     * @namespace @openiqos/ble
     * @param bluetooth for browser use `navigator.bluetooth`, in Node.js `webbluetooth` module.
     */
    constructor(bluetooth: Bluetooth) {
        this.bluetooth = bluetooth;
    }

    /**
     * @namespace @openiqos/ble
     * @description Connect to device.
     */
    public async connect() {
        try {
            this.device = await this.bluetooth.requestDevice({
                // acceptAllDevices: false,
                filters: [{
                    services: ["daebb240-b041-11e4-9e45-0002a5d5c51b"]
                }]
            });
            this.server = await this.device.gatt?.connect();
            this.primaryService = await this.server?.getPrimaryService("daebb240-b041-11e4-9e45-0002a5d5c51b");
            this.battery.service = await this.primaryService?.getCharacteristic(this.battery.serviceUUID);
            await this.bootstrapBattery(this.battery.service);
        } catch (error) {
            if (error) throw new Error("Error while connecting to device: " + error.toString());
        }
    }

    private async bootstrapBattery(batteryService: BluetoothRemoteGATTCharacteristic) {
        console.log(await batteryService.readValue());
        //@ts-ignore
        this.handleBatteryValue(await batteryService.readValue());
        await batteryService.startNotifications();
        batteryService.addEventListener("characteristicvaluechanged", (ev) => {
            //@ts-ignore
            const rawData = ev.target.value.buffer;
            this.handleBatteryValue(rawData);
        })
    }

    private handleBatteryValue(value: ArrayBuffer) {
        const rawData = new Uint8Array(value);
        this.battery.holderReady = rawData[6] >= 0 ? true : false;
        this.battery.case = rawData[0];
        console.log(this.battery);
    }
}