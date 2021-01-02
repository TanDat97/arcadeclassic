const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()
const port = process.env.PORT || 3000

app.prepare()
    .then(() => {
        // server.get('/treatments/:pid', (req, res) => {
        //     const id = req.params.pid;
        //     console.log('treatments/:pid', id);
        //     return app.render(req, res, '/treatments/' + id)
        // });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, err => {
            if (err) console.log(err)
            console.log('> Ready on port ' + port);
        })
    })
    .catch(err => {
        console.log(err);
        process.exit();
    });