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