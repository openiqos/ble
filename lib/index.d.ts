/// <reference types="web-bluetooth" />
export declare class iQOS {
    private bluetooth;
    device: (BluetoothDevice | undefined);
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
}
