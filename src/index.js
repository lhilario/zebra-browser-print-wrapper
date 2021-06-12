const axios = require('axios');

const API_URL = 'http://localhost:9100/';

class ZebraBrowserPrintWrapper {

    constructor() {
        this.device = {};
    }

    getAvailablePrinters = async () => {

        const endpoint = API_URL + 'available';

        try {
            const req = await axios(endpoint);
            const data = req.data;
            if(data && data !== undefined && data.printer && data.printer !== undefined && data.printer.length > 0) {
                return data.printer;
            }

            return new Error("No printers available");

        } catch (error) {
            throw new Error(error);
        }

    };

    getDefaultPrinter = async () => {

        const endpoint = API_URL + 'default';

        try {
            const req = await axios(endpoint);
            const data = req.data;

            if(data && data !== undefined && typeof data !== "object" && data.split("\n\t").length === 7) {
                const deviceRaw = data.split("\n\t");

                const name = this.cleanUpString(deviceRaw[1]);
                const deviceType = this.cleanUpString(deviceRaw[2]);
                const connection = this.cleanUpString(deviceRaw[3]);
                const uid = this.cleanUpString(deviceRaw[4]);
                const provider = this.cleanUpString(deviceRaw[5]);
                const manufacturer = this.cleanUpString(deviceRaw[6]);
    
                return {
                    connection,
                    deviceType,
                    manufacturer,
                    name,
                    provider,
                    uid,
                    version: 0
                };
            }

            return new Error("There's no default printer");

        } catch (error) {
            throw new Error(error);
        }

    };

    setPrinter = (device) => {
        this.device = device;
    };

    getPrinter = () => {
        return this.device;
    };

    cleanUpString = (str) => {
        str = str.split(":");
        str = str[1].trim();
        return str;
    };

    checkPrinterStatus = async () => {
        await this.write('~HQES');
        const result = await this.read();

        let errors = [];
        let isReadyToPrint = false;

        const is_error = result.charAt(70);
        const media = result.charAt(88);
        const head = result.charAt(87);
        const pause = result.charAt(84);

        isReadyToPrint = is_error === '0';

        switch(media) {
            case "1":
                errors.push("Paper out");
                break;
            case "2":
                errors.push("Ribbon Out");
                break;
            case "4":
                errors.push("Media Door Open");
                break;
            case "8":
                errors.push("Cutter Fault");
                break;
            default:
                break;
        }

        switch(head) {
            case "1":
                errors.push("Printhead Overheating");
                break;
            case "2":
                errors.push("Motor Overheating");
                break;
            case "4":
                errors.push("Printhead Fault");
                break;
            case "8":
                errors.push("Incorrect Printhead");
                break;
            default:
                break;
        }

        if (pause === '1') errors.push("Printer Paused");

        if (!isReadyToPrint && errors.Count === 0) errors.push("Error: Unknown Error");

        return {
            isReadyToPrint,
            errors: errors.join()
        };

    };

    write = async (data) => {
        try {
            const endpoint = API_URL + 'write';

            const config = {
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8'
                }
            };
    
            const myData = {
                device: this.device,
                data: data
            };
    
            await axios.post(endpoint, myData, config);
        } catch(error) {
            throw new Error(error);
        }
    };

    read = async () => {
        try {
            const endpoint = API_URL + 'read';

            const config = {
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8'
                }
            };
    
            const myData = {
                device: this.device,
            };
    
            const result = await axios.post(endpoint, myData, config);
            return result.data;
        } catch(error) {
            throw new Error(error);
        }
    };

    print = async (text) => {
        try {
            await this.write(text);
        } catch (error) {
            throw new Error(error);
        }
    };

}

module.exports = ZebraBrowserPrintWrapper;