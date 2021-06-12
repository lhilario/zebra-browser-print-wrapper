const ZebraBrowserPrintWrapper = require('./src/index');

const printBarcode = async (serial) => {
    try {

        const browserPrint =  new ZebraBrowserPrintWrapper();
  
        const defaultPrinter =  await browserPrint.getDefaultPrinter();
    
        browserPrint.setPrinter(defaultPrinter);
  
        const printerStatus = await browserPrint.checkPrinterStatus();
  
        if(printerStatus.isReadyToPrint) {

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