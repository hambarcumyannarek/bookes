import express, { response } from 'express';
import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name
})

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.redirect(path.resolve('public/index.html'));
})

app.get('/addProductData', (req, res) => {
    function myPromis() {
        return new Promise((resolve, reject)=> {
            resolve(pool.query(`select * from bookes`));
        })
    };

    myPromis().then((result)=> {
        res.send(result)
    })

})

app.post('/addProductData', (req, res) => {
    const { name, img, price } = req.body;
    (async function () {
        const result = await pool.query(`insert into bookes(name, img, price) values(?, ?, ?)`, [name, img, price]);
        res.redirect('/addProductData');
    })();
    console.log(name, img, price)
})

app.listen(process.env.PORT);