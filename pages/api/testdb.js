const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function main() {
    try {
        sqlite3.verbose();
        const ordersDb = await createDbConnection('./ProcessedOrders.db');
        const orderProcessed = await orderAlreadyProcessed(ordersDb, "555");
        console.log("orderProcessed = " + orderProcessed);
        if (!orderProcessed) {
            console.log("So condition is met!");
        }
    } catch (error) {
        console.error(error);
    }
}


async function orderAlreadyProcessed(ordersDb, orderNumberStr) {
    try {
        console.log('Starting orderAlreadyProcessed function');
        const query = 'SELECT COUNT(SoldOrderNumber) as `recsCount` from ProcessedSoldOrders where SoldOrderNumber = ?;'
        const row = await ordersDb.get(query, [orderNumberStr]);
        console.log('Row with count =', row);
        console.log('row.recsCount =', row.recsCount);
        const result = typeof row !== 'undefined' && row.recsCount > 0;
        console.log('Returning ' + result);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function createDbConnection(filename) {
    return open({
        filename,
        driver: sqlite3.Database
    });
}

main();