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
        const result = await table.select(['id', 'content', 'likes', 'created'])
        .where('removed = FALSE')
        .execute();
        const posts = mapRows(result);
        console.log(posts);
        // const table = session.getDefaultSchema().getTable('posts');
    } catch (e) {
        console.error(e);
    }
    if (session !== null) {
        await session.close();
    }
}
execute();