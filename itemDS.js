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
            name: "qty",
            title: "Qty"
        },
        {
            name: "price",
            title: "Price",
            type: "float"
        },
        {
            name: "total",
            title: "Total",
            type: "float"
        }
    ],
    clientOnly: true,
    testData: mySampleData
})