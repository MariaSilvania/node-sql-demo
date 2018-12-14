const sql = require('mssql')

async function exemploRapido() {
    try {
        await sql.connect('mssql://sa:Avanade2018@localhost/Spotify')
        const result = await sql.query('select * from singers')
        console.log(result)
    } catch (err) {
        console.log(err);
    }
    sql.close();
}

const config = {
    user: 'sa',
    password: 'Avanade2018',
    server: 'localhost',
    database: 'Spotify',
}

async function exemploAsync() {
    try {
        let pool = await sql.connect(config)

        let result1 = await pool.request()
            .input('id', sql.Int, 1)
            .query('select * from SINGERS where id = @id')

        console.log(result1)
    } catch (err) {
        console.log(err);
    }
    sql.close();
}

function exemploPromise() {
    sql.connect(config)
        .then(pool => {
            return pool.request()
                .input('id', sql.Int, 1)
                .query('select * from SINGER where id = @id')
        })
        .then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err);
        })
    sql.close();
}

function exemploPromiseComTemplate() {
    sql.connect(config).then(() => {
        let value = 1;
        return sql.query`select * from SINGERS where id = ${value}`
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err);
    })
    sql.close();
}

function exemploCallback() {
    sql.connect(config, err => {
        if (err) {
            console.log(err)
        }

        new sql.Request().query('select * from SINGERS as number', (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result)
            }
        })
    })
    sql.close();
}

async function exemploConnectionPool() {
    const pool1 = await new sql.ConnectionPool(config).connect();
    try {
        const request = pool1.request(); // or: new sql.Request(pool1)
        const result = await request.query('select * from SINGERS as number')
        console.log(result)
    } catch (err) {
        console.error('SQL error', err);
    }
}

// exemploRapido();
// exemploAsync();
// exemploPromise();
// exemploPromiseComTemplate();
// exemploCallback();
// exemploConnectionPool();