export interface iQOSBattery {
    serviceUUID: BluetoothServiceUUID;
    service: BluetoothRemoteGATTService | any;
    case: number | undefined;
    holderReady: boolean | undefined;
}