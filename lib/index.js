"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var iQOS = /** @class */ (function () {
    /**
     * @namespace @openiqos/ble
     * @param bluetooth for browser use `navigator.bluetooth`, in Node.js `webbluetooth` module.
     */
    function iQOS(bluetooth) {
        this.device = undefined;
        this.battery = {
            serviceUUID: "ecdfa4c0-b041-11e4-8b67-0002a5d5c51b",
            service: undefined,
            case: undefined,
            holderReady: undefined
        };
        this.bluetooth = bluetooth;
    }
    /**
     * @namespace @openiqos/ble
     * @description Connect to device.
     */
    iQOS.prototype.connect = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, _e, _f, _g, error_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 6, , 7]);
                        _d = this;
                        return [4 /*yield*/, this.bluetooth.requestDevice({
                                // acceptAllDevices: false,
                                filters: [{
                                        services: ["daebb240-b041-11e4-9e45-0002a5d5c51b"]
                                    }]
                            })];
                    case 1:
                        _d.device = _h.sent();
                        _e = this;
                        return [4 /*yield*/, ((_a = this.device.gatt) === null || _a === void 0 ? void 0 : _a.connect())];
                    case 2:
                        _e.server = _h.sent();
                        _f = this;
                        return [4 /*yield*/, ((_b = this.server) === null || _b === void 0 ? void 0 : _b.getPrimaryService("daebb240-b041-11e4-9e45-0002a5d5c51b"))];
                    case 3:
                        _f.primaryService = _h.sent();
                        _g = this.battery;
                        return [4 /*yield*/, ((_c = this.primaryService) === null || _c === void 0 ? void 0 : _c.getCharacteristic(this.battery.serviceUUID))];
                    case 4:
                        _g.service = _h.sent();
                        return [4 /*yield*/, this.bootstrapBattery(this.battery.service)];
                    case 5:
                        _h.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _h.sent();
                        if (error_1)
                            throw new Error("Error while connecting to device: " + error_1.toString());
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    iQOS.prototype.bootstrapBattery = function (batteryService) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = console).log;
                        return [4 /*yield*/, batteryService.readValue()];
                    case 1:
                        _b.apply(_a, [_d.sent()]);
                        //@ts-ignore
                        _c = this.handleBatteryValue;
                        return [4 /*yield*/, batteryService.readValue()];
                    case 2:
                        //@ts-ignore
                        _c.apply(this, [_d.sent()]);
                        return [4 /*yield*/, batteryService.startNotifications()];
                    case 3:
                        _d.sent();
                        batteryService.addEventListener("characteristicvaluechanged", function (ev) {
                            //@ts-ignore
                            var rawData = ev.target.value.buffer;
                            _this.handleBatteryValue(rawData);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    iQOS.prototype.handleBatteryValue = function (value) {
        var rawData = new Uint8Array(value);
        this.battery.holderReady = rawData[6] >= 0 ? true : false;
        this.battery.case = rawData[0];
        console.log(this.battery);
    };
    return iQOS;
}());
exports.iQOS = iQOS;
