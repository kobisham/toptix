var mySampleData = [{
        itemName: "Item 1",
        description: "Item 1 description",
        Qty: 2,
        Price: 22.5
    },
    {
        itemName: "Item 2",
        description: "Item 2 description",
        Qty: 4,
        Price: 3
    }
];

isc.DataSource.create({
    ID: "itemDS",
    fields: [
        
        {
            name: "itemName",
            title: "item Name",
            primaryKey:true
        },
        {
            name: "description",
            title: "description"
        },
        {
            name: "Qty",
            title: "Qty"
        },
        {
            name: "Price",
            title: "Price",
            type: "float"
        },
        {
            name: "Total",
            title: "Total",
            type: "float"
        }
    ],
    clientOnly: true,
    testData: mySampleData
})


isc.Label.create({
    wrap: false,
    contents: "<b>Master</b>",
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

    // fields to display
    fields: [{
            name: "itemName"
        },
        {
            name: "Qty"
        },
        {
            name: "Price"
        },
        {
            name: "Total",
            canEdit: false,
            formatCellValue: function (value, record) {
                return record.Qty * record.Price;
            }
        }
    ],
    editorExit: function (event, record, newValue, rowNum, colNum) {
        var fieldName = this.getFieldName(colNum);
        if (fieldName == 'Qty' || fieldName == 'Price') {
            this.refreshCell(rowNum, this.getFieldNum('Total'), false, true);
        }
    },
    selectionChanged: function (record) {
        itemForm.editRecord(record);
        //orderItemsList.setData(record.items);
    },
    canEdit: true,
    canRemoveRecords: true,
    editEvent: "click",
    saveLocally: true
});


isc.IButton.create({
    top: 240,
    title: "Add New",
    click: "itemList.startEditingNew()"
});

isc.Label.create({
    id: "itemDetailLabel",
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
        })

    ],

});