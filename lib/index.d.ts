import { Device } from './types';
export default class ZebraBrowserPrintWrapper {
    device: Device;
    getAvailablePrinters: () => Promise<any>;
    getDefaultPrinter: () => Promise<Device>;
    setPrinter: (device: Device) => void;
    getPrinter: () => Device;
    cleanUpString: (str: string) => string;
    checkPrinterStatus: () => Promise<{
        isReadyToPrint: boolean;
        errors: string;
    }>;
    write: (data: string) => Promise<void>;
    writeBlob: (data: Blob) => Promise<void>;
    writeUrl: (url: string) => Promise<void>;
    read: () => Promise<string>;
    print: (text: string) => Promise<void>;
    printBlob: (text: Blob) => Promise<void>;
    printUrl: (url: string) => Promise<void>;
}
