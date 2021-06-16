import ZebraBrowserPrintWrapper from '../index';

global.fetch = require('node-fetch').default;

const printBarcode = async (serial: string): Promise<boolean> => {
  try {
    const browserPrint = new ZebraBrowserPrintWrapper();

    const defaultPrinter = await browserPrint.getDefaultPrinter();

    browserPrint.setPrinter(defaultPrinter);

    const printerStatus = await browserPrint.checkPrinterStatus();

    if (printerStatus.isReadyToPrint) {
      const zpl = `^XA
^BY2,2,100
^FO20,20^BC^FD${serial}^FS
^XZ`;

      browserPrint.print(zpl);

      return true;
    } else {
      console.log('Error/s', printerStatus.errors);
      return false;
    }
  } catch (error) {
    console.log('Error', error);
    return false;
  }
};

test('Print Bar Code', async () => {
  const serial = '0123456789';
  const result = await printBarcode(serial);
  expect(result).toBe(true);
});
