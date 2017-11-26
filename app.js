
isc.Label.create({
    ID: "masterLabel",
    wrap: false,
    contents: "<b>Master</b> *double click to edit row",
    height: 20,
    autoDraw: true,
    baseStyle: "exampleSeparator"
});

isc.ListGrid.create({
    ID: "itemList",
    top: 30,
    width: 550,
    height: 200,
    alternateRecordStyles: true,
    dataSource: itemDS,
    autoFetchData: true,
    canEdit: true,
    canRemoveRecords: true,
    editEvent: "doubleClick",
    saveLocally: true,

    // fields to display
    fields: [{
            name: "itemName"
        },
        {
            name: "qty", summaryFunction:"sum"
        },
        {
            name: "price"
        },
        {
            name: "total",
            canEdit: false,
            //type:"summary", 
            summaryFunction:"sum",
            formatCellValue: function (value, record) {
                return record.qty * record.price;
            }
        }
    ],
    // functions
    editorExit: function (event, record, newValue, rowNum, colNum) {
        var fieldName = this.getFieldName(colNum);
        if (fieldName == 'qty' || fieldName == 'price') {
            this.refreshCell(rowNum, this.getFieldNum('total'), false, true);
        }
    },
    selectionChanged: function (record) {
        itemForm.editRecord(record);

    },
    dataChanged: function () {
        // update totals form
        var totalQty = 0;
        var totalAmount = 0;
        var myArr = itemList.getData().allRows;
        for (var i=0;i<myArr.length;i++) {
            totalQty += Number(myArr[i].qty);
            totalAmount += Number(myArr[i].qty * myArr[i].price);
        }     
        totalsForm.getItem("totalQty").setValue(totalQty);
        totalsForm.getItem("totalAmount").setValue(totalAmount);
    }
   
});


isc.IButton.create({
    top: 240,
    title: "Add New",
    click: "itemList.startEditingNew()"
});

isc.Label.create({
    ID: "itemDetailLabel",
    top: 280,
    wrap: false,
    contents: "<b>Item Details</b>",
    height: 20,
    autoDraw: true
});

isc.DynamicForm.create({
    ID: "itemForm",
    dataSource: itemDS,
    autoDraw: false,
    fields: [{
            name: "itemName",
            title: "Name",
            canEdit:false
        },
        {
            name: "description",
            title: "Description"
        },

    ]
});

isc.Label.create({
    ID: "itemTotalsLabel",
    wrap: false,
    contents: "<b>Totals</b>",
    height: 20,
    autoDraw: false
});

isc.DynamicForm.create({
    ID: "totalsForm",
    autoDraw: false,
    fields: [{
            name: "totalQty",
            title: "Total Qty",
            canEdit:false
        },
        {
            name: "totalAmount",
            title: "Total Amount",
            canEdit:false
        },

    ]
});

isc.VLayout.create({
    top: 300,
    width: 500,
    autoDraw: true,
    membersMargin: 0,
    members: [
        itemForm,
        isc.IButton.create({
            title: "Save",
            autoDraw: false,
            click: function () {
                isc.RPCManager.startQueue();
                
                //itemForm.setValue("items", orderItemsList.data);
                itemForm.saveData();
                
                isc.RPCManager.sendQueue(function () {
                    //itemForm.clearValues();
                    //itemList.deselectAllRecords();
                    isc.say('Data saved');
                   
                });
            }
        }),
        itemTotalsLabel,
        totalsForm

    ],

});