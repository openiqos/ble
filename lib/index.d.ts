/// <reference types="web-bluetooth" />
import { iQOSBattery } from "./interfaces/iqos";
export declare class iQOS {
    private bluetooth;
    device: (BluetoothDevice | undefined);
    private server;
    private primaryService;
    battery: iQOSBattery;
    /**
     * @namespace @openiqos/ble
     * @param bluetooth for browser use `navigator.bluetooth`, in Node.js `webbluetooth` module.
     */
    constructor(bluetooth: Bluetooth);
    /**
     * @namespace @openiqos/ble
     * @description Connect to device.
     */
    connect(): Promise<void>;
    private bootstrapBattery;
    private handleBatteryValue;
}
