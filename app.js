
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
            name: "Qty", summaryFunction:"sum"
        },
        {
            name: "Price"
        },
        {
            name: "Total",
            canEdit: false,
            //type:"summary", 
            summaryFunction:"sum",
            formatCellValue: function (value, record) {
                return record.Qty * record.Price;
            }
        }
    ],
    // functions
    editorExit: function (event, record, newValue, rowNum, colNum) {
        var fieldName = this.getFieldName(colNum);
        if (fieldName == 'Qty' || fieldName == 'Price') {
            this.refreshCell(rowNum, this.getFieldNum('Total'), false, true);
        }
    },
    selectionChanged: function (record) {
        itemForm.editRecord(record);
        this.recalculateSummaries();        
        totalsForm.getItem("totalQty").setValue(this.getGridSummaryData()[0].Qty);
        totalsForm.getItem("totalAmount").setValue(this.getGridSummaryData()[0].Total);
        
        //orderItemsList.setData(record.items);
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
    autoDraw: true,
    baseStyle: "exampleSeparator"
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
    autoDraw: false,
    baseStyle: "exampleSeparator"
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
                    itemList.deselectAllRecords();
                    isc.say('Data saved');
                   
                });
            }
        }),
        itemTotalsLabel,
        totalsForm

    ],

});