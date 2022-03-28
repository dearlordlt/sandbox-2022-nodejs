const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3002;
app.use(cors());
app.get('/api/login', (req, res) => {
    const { user, password } = req.query;
    if (user === 'test@test.com' && password === '1234567') {
        const jwtBearerToken = jwt.sign({ user }, 'secret', { expiresIn: '1h' });
        return res.send({ apiKey: jwtBearerToken, expiresIn: 10 * 60 * 1000 })
    }
    return res.status(401).send('Non auth');
})

app.post('/api/health-check', (req, res) => {
    return res.send({message: 'Health-check is ok'});
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})