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
var constants_1 = require("./constants");
var ZebraBrowserPrintWrapper = /** @class */ (function () {
    function ZebraBrowserPrintWrapper() {
        var _this = this;
        this.device = {};
        this.getAvailablePrinters = function () { return __awaiter(_this, void 0, void 0, function () {
            var config, endpoint, res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'text/plain;charset=UTF-8',
                            },
                        };
                        endpoint = constants_1.API_URL + 'available';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(endpoint, config)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
                        if (data && data !== undefined && data.printer && data.printer !== undefined && data.printer.length > 0) {
                            return [2 /*return*/, data.printer];
                        }
                        return [2 /*return*/, new Error('No printers available')];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getDefaultPrinter = function () { return __awaiter(_this, void 0, void 0, function () {
            var config, endpoint, res, data, deviceRaw, name_1, deviceType, connection, uid, provider, manufacturer, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'text/plain;charset=UTF-8',
                            },
                        };
                        endpoint = constants_1.API_URL + 'default';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(endpoint, config)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.text()];
                    case 3:
                        data = _a.sent();
                        if (data && data !== undefined && typeof data !== 'object' && data.split('\n\t').length === 7) {
                            deviceRaw = data.split('\n\t');
                            name_1 = this.cleanUpString(deviceRaw[1]);
                            deviceType = this.cleanUpString(deviceRaw[2]);
                            connection = this.cleanUpString(deviceRaw[3]);
                            uid = this.cleanUpString(deviceRaw[4]);
                            provider = this.cleanUpString(deviceRaw[5]);
                            manufacturer = this.cleanUpString(deviceRaw[6]);
                            return [2 /*return*/, {
                                    connection: connection,
                                    deviceType: deviceType,
                                    manufacturer: manufacturer,
                                    name: name_1,
                                    provider: provider,
                                    uid: uid,
                                    version: 0,
                                }];
                        }
                        throw new Error("There's no default printer");
                    case 4:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.setPrinter = function (device) {
            _this.device = device;
        };
        this.getPrinter = function () {
            return _this.device;
        };
        this.cleanUpString = function (str) {
            var arr = str.split(':');
            var result = arr[1].trim();
            return result;
        };
        this.checkPrinterStatus = function () { return __awaiter(_this, void 0, void 0, function () {
            var result, errors, isReadyToPrint, isError, media, head, pause;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.write('~HQES')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.read()];
                    case 2:
                        result = _a.sent();
                        errors = [];
                        isReadyToPrint = false;
                        isError = result.charAt(70);
                        media = result.charAt(88);
                        head = result.charAt(87);
                        pause = result.charAt(84);
                        isReadyToPrint = isError === '0';
                        switch (media) {
                            case '1':
                                errors.push('Paper out');
                                break;
                            case '2':
                                errors.push('Ribbon Out');
                                break;
                            case '4':
                                errors.push('Media Door Open');
                                break;
                            case '8':
                                errors.push('Cutter Fault');
                                break;
                            default:
                                break;
                        }
                        switch (head) {
                            case '1':
                                errors.push('Printhead Overheating');
                                break;
                            case '2':
                                errors.push('Motor Overheating');
                                break;
                            case '4':
                                errors.push('Printhead Fault');
                                break;
                            case '8':
                                errors.push('Incorrect Printhead');
                                break;
                            default:
                                break;
                        }
                        if (pause === '1')
                            errors.push('Printer Paused');
                        if (!isReadyToPrint && errors.length === 0)
                            errors.push('Error: Unknown Error');
                        return [2 /*return*/, {
                                isReadyToPrint: isReadyToPrint,
                                errors: errors.join(),
                            }];
                }
            });
        }); };
        this.write = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var endpoint, myData, config, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = constants_1.API_URL + 'write';
                        myData = {
                            device: this.device,
                            data: data,
                        };
                        config = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'text/plain;charset=UTF-8',
                            },
                            body: JSON.stringify(myData),
                        };
                        return [4 /*yield*/, fetch(endpoint, config)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.writeBlob = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var endpoint, deviceData, formData, config, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = constants_1.API_URL + 'write';
                        deviceData = {
                            device: this.device
                        };
                        formData = new FormData;
                        formData.append("json", JSON.stringify(deviceData));
                        formData.append("blob", data);
                        config = {
                            method: "POST",
                            body: formData,
                        };
                        return [4 /*yield*/, fetch(endpoint, config)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error(error_4);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.writeUrl = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var endpoint, deviceData, contentBlob, formData, config, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        endpoint = constants_1.API_URL + 'write';
                        deviceData = {
                            device: this.device
                        };
                        return [4 /*yield*/, fetch(url).then(function (r) { return r.blob(); })];
                    case 1:
                        contentBlob = _a.sent();
                        formData = new FormData;
                        formData.append("json", JSON.stringify(deviceData));
                        formData.append("blob", contentBlob);
                        config = {
                            method: 'POST',
                            body: formData,
                        };
                        return [4 /*yield*/, fetch(endpoint, config)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error(error_5);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.read = function () { return __awaiter(_this, void 0, void 0, function () {
            var endpoint, myData, config, res, data, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        endpoint = constants_1.API_URL + 'read';
                        myData = {
                            device: this.device,
                        };
                        config = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'text/plain;charset=UTF-8',
                            },
                            body: JSON.stringify(myData),
                        };
                        return [4 /*yield*/, fetch(endpoint, config)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.text()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error(error_6);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.print = function (text) { return __awaiter(_this, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.write(text)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        throw new Error(error_7);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.printBlob = function (text) { return __awaiter(_this, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.writeBlob(text)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        throw new Error(error_8);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.printUrl = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.writeUrl(url)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        throw new Error(error_9);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return ZebraBrowserPrintWrapper;
}());
exports.default = ZebraBrowserPrintWrapper;
