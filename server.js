const csv = require('@fast-csv/parse');

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json({limit: '10mb'}));
const port = process.env.PORT || 5000;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));


app.get('/test', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// create a POST route
app.post('/transform', (req, res) => {

    const rawData = req.body.data;

    let results = {
        grandTotal: 0.00,
        itemCount: 0,
        averageCost: 0.00,
        itemCountByCost: [0,0,0,0,0],
        leastExpensive: {
            price: 9999.99,
            purchaseDate: ''
        },
        mostExpensive: {
            price: 0.00,
            purchaseDate: ''
        },
        scatterChartData: [],
        startDate: '',
        endDate: '',
        items: []
    };

    let index = 0;

    csv.parseString(rawData, { headers: true })
        .validate(data => data !== undefined && data !== null)
        .on('error', error => console.error(error))
        .on('data', row => {
            if (!row || row === '' || row == null) {
                console.warn(`EMPTY ROW FOUND`);
                return;
            }


            if (index === 0) {
                results.startDate = row['Order Date'];
            }

            results.itemCount += 1;

            const amount = parseFloat(row['Item Total'].replace('$', ''))
            results.items.push({
                purchaseDate: row['Order Date'],
                name: row['Title'],
                price: amount
            })

            results.scatterChartData.push({
                x: results.scatterChartData.length,
                y: amount,
                label: row['Title']
            })

            if (amount > results.mostExpensive.price) {
                results.mostExpensive.price = amount;
                results.mostExpensive.purchaseDate = row['Order Date'];
                results.mostExpensive.name = row['Title'];
            }

            if (amount > 0 && amount < results.leastExpensive.price) {
                results.leastExpensive.price = amount;
                results.leastExpensive.purchaseDate = row['Order Date'];
                results.leastExpensive.name = row['Title'];
            }

            switch (true) {
                case (amount < 25) :
                    results.itemCountByCost[0] += 1;
                    break
                case (amount < 50) :
                    results.itemCountByCost[1] += 1;
                    break;
                case (amount < 100) :
                    results.itemCountByCost[2] += 1;
                    break;
                case (amount < 500) :
                    results.itemCountByCost[3] += 1;
                    break;
                default :
                    results.itemCountByCost[4] += 1;

            }

            results.grandTotal += amount;
            results.endDate = row['Order Date'];

            index +=1 ;
        })
        .on('data-invalid', (row, rowNumber) => console.log(`Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`))
        .on('end', (rowCount ) => {
            console.log(`Parsed ${rowCount} rows`);
            results.averageCost = results.grandTotal / results.itemCount;
            res.send({ status: 200, results: { ...results } });
        });
});