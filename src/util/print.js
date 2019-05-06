
export const ZPLPrintOrder = orderData => {
    return printData(orderData);
}

const printData = orderData => {
    let zpl = `
        ^XA
        ^FX Interpret correctly accentuation
        ^CI28
        ^FX Top section with order number, date and time
        ^CF0,60
        ^FO300,50^FDPedido ${orderData.id}^FS
        ^CF0,40
        ^FO260,100^FDData: ${orderData.createdAt}^FS

        ^FX Divider
        ^FO50,150^GB700,1,3^FS

        ^FX Second section with recipient address
        ^CFA,30
        ^FO50,200^FD${orderData.customerName}^FS
        ^FO50,240^FD${orderData.address}^FS
        ^FO50,280^FD${orderData.phone}^FS

        ^FX Divider
        ^FO50,330^GB700,1,3^FS
        ^FX Third section with order data
        ^CFA,20
        ^FO50,360^FDQtd^FS
        ^FO100,360^FDDescrição^FS
        ^FO450,360^FDUnit.^FS
        ^FO660,360^FDTotal^FS
        ^CFA,25
    `;

    let line = 390

    if (orderData.items && orderData.items.length > 0) {
        orderData.items.map(item => {
            zpl += `^FO50,${line}^FD${item.qty}^FS`;

            if (item.flavor && item.size) {
                zpl += `^FO100,${line}^FD${item.flavor} ${item.size}^FS`;
            } else if (item.beverage) {
                zpl += `^FO100,${line}^FD${item.beverage}^FS`;
            }
            zpl += `^FO450,${line}^FD${item.price}^FS
                ^FO630,${line}^FDR${item.price * item.qty}^FS`;
            line += 40;
        });
    } else if (orderData.details) {
        if (orderData.details) {
            // split in arrays of 35 characters
            // var arrComments = orderData.comments.match(/(.{1,35})/g);

            // split in arrays divided by newlines
            var arrDetails = orderData.details.split('\n');
            arrDetails.map(detail => {
                zpl += `    
            ^FO50,${line}^FD${detail}^FS`;
                line += 30;
            });
        }
    }
    zpl += `            
        ^FX Divider
        ^FO50,${line}^GB700,1,3^FS`;

    line += 30;
    zpl += `
        ^FO450,500^FDTotal:^FS
        ^FO630,500^FDR${orderData.total}^FS`;

    line += 50;
    zpl += `
        ^FX Fourth section with additional data
        ^CFA,20
        ^FO50,${line}^FDForma Pagto^FS`;

    line += 20;
    zpl += `    
        ^FO50,${line}^FD${orderData.payment_type}^FS`;

    line += 40;
    zpl += `    
        ^FO50,${line}^FDObs.^FS`;

    line += 20;

    // if (orderData.comments) {
    //     // split in arrays of 35 characters
    //     var arrDetails = orderData.comments.match(/(.{1,35})/g);
    //     arrDetails.map(comment => {
    //         zpl += `    
    //     ^FO50,${line}^FD${comment}^FS`;
    //         line += 30;
    //     });
    // }

    zpl += `^XZ`;

    return zpl;
}
