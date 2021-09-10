const mysqlx = require('@mysql/xdevapi');

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
        // const table = session.getDefaultSchema().getTable('posts');
    } catch (e) {
        console.error(e);
    }
    if  (session != null) {
        await session.close();
    }
}
execute();