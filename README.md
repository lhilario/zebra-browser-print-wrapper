# Zebra Browser Print Wrapper

This package is a wrapper for the [Zebra Browser Print](https://www.zebra.com/la/es/support-downloads/printer-software/by-request-software.html#browser-print) and allows you to easily integrate your Zebra printers with web applications like (ReactJS).

## Install

Install the module in your project via YARN

```bash
yarn add zebra-browser-print-wrapper
```

Or NPM

```bash
npm i zebra-browser-print-wrapper
```


## Available Methods

##### **getAvailablePrinters()**

Return a list of the current available printers

##### **getDefaultPrinter()**

Gets the current default printer

##### **setPrinter()**

Sets the printer field

##### **getPrinter()**

Returns the printer field

##### **checkPrinterStatus()**

Returns an object indicating if the printer is ready and if not returns the error.

**Returned object:**

```js
{
 isReadyToPrint: boolean;
 errors: string
}
```

**Possible errors:**

- Paper out
- Ribbon Out
- Media Door Open
- Cutter Fault
- Printhead Overheating
- Motor Overheating
- Printhead Fault
- Incorrect Printhead
- Printer Paused
- Unknown Error

##### **print(str)**

Prints a text string.

You can use this method with simple text or add a string using the [ZPL language](https://www.zebra.com/content/dam/zebra/manuals/printers/common/programming/zpl-zbi2-pm-en.pdf "ZPL language")


## Example

```js
// Import the zebra-browser-prit-wrapper package
const  ZebraBrowserPrintWrapper = require('zebra-browser-print-wrapper');

const printBarcode = async (serial) => {
    try {

        // Create a new instance of the object
        const browserPrint =  new ZebraBrowserPrintWrapper();

        // Select default printer
        const defaultPrinter =  await browserPrint.getDefaultPrinter();
    
        // Set the printer
        browserPrint.setPrinter(defaultPrinter);

        // Check printer status
        const printerStatus = await browserPrint.checkPrinterStatus();

        // Check if the printer is ready
        if(printerStatus.isReadyToPrint) {

            // ZPL script to print a simple barcode
            const zpl = `^XA
                        ^BY2,2,100
                        ^FO20,20^BC^FD${serial}^FS
                        ^XZ`;

            browserPrint.print(zpl);
        } else {
        console.log("Error/s", printerStatus.errors);
        }

    } catch (error) {
        throw new Error(error);
    }
};

const serial = "0123456789";

printBarcode(serial);
```
