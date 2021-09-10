const mysqlx = require('@mysql/xdevapi');

const mapRows = result => { 
    const rows = result.fetchAll();
    const columns = result.getColumns();

    return rows.map(row => Object.fromEntries(
        row.map((o, idx) => [columns[idx].getColumnLabel(), o])
    ));
};

async function execute() {
    let session = null;
    try {
        session = await mysqlx.getSession({
            user: 'app',
            password: 'pass',
            host: 'localhost',
            port: 33060,
        });
        const db = session.getSchema('social');
        const table = db.getTable('posts');
        const result = await table.update()
        .set('removed', 1)
        .where('id = 5 AND removed = FALSE')
        .execute();
    } catch (e) {
        console.error(e);
    }
    if (session !== null) {
        await session.close();
    }
}
execute();