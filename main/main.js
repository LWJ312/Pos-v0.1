/**
 * Created by lwj_312 on 17-7-11.
 */
function createnewinputs(inputs) {
    let newinputs=[];
    let n=0;
    let count=[];
    count[0]=1;
    for(let i=0;i<inputs.length-1;i++)
    {
        newinputs[n]=inputs[i];
        if(inputs[i+1].barcode===inputs[i].barcode) {
            if (i !== inputs.length - 2)
                count[n]++;
            else {
                coun [n]++;
                newinputs[n].count = count[n];
            }
        }
        else{
            newinputs[n].count=count[n];
            n++;
            count[n]=1;
        }

    }
    if(inputs[inputs.length-1]!==inputs[inputs.length-2])
    {newinputs[n]=
        {
            barcode:inputs[inputs.length-1].barcode,
            name:inputs[inputs.length-1].name,
            unit:inputs[inputs.length-1].unit,
            price:inputs[inputs.length-1].price,
            count:count[n]
        };
    }
    return newinputs;
}

function buildsheet(newinputs) {
    let sheet=[];
    let calculatedprice=calculateprice(newinputs);
    for(let n=0;n<newinputs.length;n++)
    {

        sheet[n]={
            barcode:newinputs[n].barcode,
            name:newinputs[n].name,
            count:newinputs[n].count,
            unit:newinputs[n].unit,
            price:newinputs[n].price
        };

        sheet[n].subprice=calculatedprice.subprice[n];

    }
    sheet.total=calculatedprice.total;

    return sheet;
}

function calculateprice(newinputs) {
    let total=0;
    let subprice=[];
    for(let n=0;n<newinputs.length;n++)
    { subprice[n]=newinputs[n].count*newinputs[n].price;
       total+=subprice[n];
    }
    return{
        subprice,
        total};
}

function buildperstrings(onestuffsheet) {
    return`名称：${onestuffsheet.name}，数量：${onestuffsheet.count}${onestuffsheet.unit}，单价：${onestuffsheet.price.toFixed(2)}(元)，小计：${onestuffsheet.subprice.toFixed(2)}(元)`
    
}

function buildreceiptstrings(sheet) {
    let receiptstrings="";
    for(let n=0;n<sheet.length-1;n++)
    {  perstrings=buildperstrings(sheet[n])+'\n';
        receiptstrings+=perstrings;
    }
    receiptstrings+=buildperstrings(sheet[sheet.length-1]);
    return receiptstrings;
}

function showReceipt(sheet) {
    let receiptstrings=buildreceiptstrings(sheet);
    return`***<没钱赚商店>收据***
${receiptstrings}
----------------------
总计：${sheet.total.toFixed(2)}(元)
**********************`

}

inputs=[
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00

    },
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
    }
];
function printReceipt(inputs)
{
let newinputs=createnewinputs(inputs);
let sheet=buildsheet(newinputs);
let result=showReceipt(sheet);
console.log(result);
}

printReceipt(inputs);
