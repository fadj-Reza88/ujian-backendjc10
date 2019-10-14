const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 1997

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Reza',
    password: 'abc123',
    database: 'moviepurwadhika',
    port: 3306,
})

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req,res) => {
    res.status(200).send('<h1>Ini Home Page</h1>')
})

app.get('/getmovies', (req,res) => {
    var nama = req.query.nama ? req.query.nama : '';
    
    var sql =`SELECT * FROM movies WHERE nama LIKE '%${nama}%';`;
    db.query(sql, (err,results) => {
        if(err) {
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})

app.get('/getmovies/:id', (req,res) => {
    var sql =`SELECT * FROM movies WHERE id=${db.escape(req.params.id)};`;

    console.log(sql)
    db.query(sql, (err,results) => {
        if(err) {
            // console.log(err)
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})

app.get('/categories', (req,res) => {
    var cat = req.query.cat ? req.query.cat : '';
    
    var sql =`SELECT * FROM categories WHERE cat LIKE '%${cat}%';`;
    db.query(sql, (err,results) => {
        if(err) {
            // console.log(err)
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})

app.get('/categories/:id', (req,res) => {
    var sql =`SELECT * FROM categories WHERE id=${db.escape(req.params.id)};`;

    console.log(sql)
    db.query(sql, (err,results) => {
        if(err) {
            // console.log(err)
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})

app.post('/addmovies', (req,res) => {
    var movies= req.body.insermovies;
    
    if(movies) {
        var sql = `INSERT INTO movies (nama) values ? `
       
        db.query(sql, [movies], (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            sql = `SELECT * from movies;`
            
            db.query(sql, (err, results) => {
                if(err) return res.status(500).send(err)

                res.status(200).send(results)
            })
        })
    }
    else {
        res.status(500).send('Tolong isi query insertmovies')
    }
})

app.put('/editmovies/:id', (req,res) => {
    var data = req.body;
    var sql = `UPDATE movies SET ? WHERE id = ${req.params.id}`
       
    db.query(sql, data, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }

        sql = `SELECT * from movies;`
        db.query(sql, (err,results1) => {
            if(err) return res.status(500).send(err)

            res.status(200).send(results1)
        })
    })
})

app.delete('/deletemovies/:id', (req,res) => {
    var sql = `DELETE FROM movies WHERE id = ${req.params.id}`
       
    db.query(sql, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})

app.post('/addcategories', (req,res) => {
    var categories = req.body.insertcategories;
    
    if(categories) {
        var sql = `INSERT INTO categories (cat) values ? `
       
        db.query(sql, [categories], (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            sql = `SELECT * from categories;`
            
            db.query(sql, (err, results) => {
                if(err) return res.status(500).send(err)

                res.status(200).send(results)
            })
        })
    }
    else {
        res.status(500).send('Tolong isi query insertcategories')
    }
})

app.put('/editcategories/:id', (req,res) => {
    var data = req.body;
    var sql = `UPDATE categories SET ? WHERE id = ${req.params.id}`
       
    db.query(sql, data, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }

        sql = `SELECT * from categories;`
        db.query(sql, (err,results1) => {
            if(err) return res.status(500).send(err)

            res.status(200).send(results1)
        })
    })
})

app.delete('/deletecategories/:id', (req,res) => {
    var sql = `DELETE FROM categories WHERE id = ${req.params.id}`
       
    db.query(sql, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})

app.get('/movcat', (req,res) => {
    var sql =`SELECT nama, cat FROM movies m
        JOIN movcat mc ON m.id = mc.idmovie
        JOIN categories c ON c.id = mc.idcategory;`;
    db.query(sql, (err,results) => {
        if(err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.post('/addmovcat', (req,res) => {
    var movecat = req.body.insertmovcat;
    
    if(movecat) {
        var sql = `INSERT INTO movcat (nama) values ? `
       
        db.query(sql, [movcat], (err, results) => {
            if(err) {
                return res.status(500).send(err)
            }
            sql = `SELECT * from movcat;`
            
            db.query(sql, (err, results) => {
                if(err) return res.status(500).send(err)

                res.status(200).send(results)
            })
        })
    }
    else {
        res.status(500).send('Tolong isi query insertcategories')
    }
})

app.delete('/deletemovcat/:id', (req,res) => {
    var sql = `DELETE FROM movecat WHERE id = ${req.params.id}`
       
    db.query(sql, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})


app.listen(port, () => console.log(`API aktif di port ${port}`))

