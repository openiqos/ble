export class iQOS {
    private bluetooth: Bluetooth;
    public device: (BluetoothDevice | undefined) = undefined;
    constructor(bluetooth: Bluetooth) {
        this.bluetooth = bluetooth;
    }

    async connect() {
        try {
            this.device = await this.bluetooth.requestDevice({
                acceptAllDevices: true,
                filters: [{
                    services: ["daebb240-b041-11e4-9e45-0002a5d5c51b"]
                }]
            });
        } catch (error) {
            if (error) throw new Error("Error while connecting to device: " + error.toString());
        }
    }
}