const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

const mongoClient = require('./mongo');

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'static/lib')));

const getPoints = async (req, res) => {
    try {
        const points = await collection.distinct('loc');
        console.log(points);
        res.json({ points });
    } catch (e) {
        console.error(e);
    }
};

const getNearestPoints = async (req, res) => {
    const params = req.params;
    console.log(params.lat*1, params.lng*1, params.weather);
    try {
      const collection = await mongoClient.getCollection();
      const points = await collection.find(
            {
                loc: {
                    $nearSphere: {
                        $geometry: {
                            type : "Point",
                            coordinates : [ params.lng*1, params.lat*1 ]
                        },
                        $minDistance: 1000,
                        $maxDistance: 2000
                    }
                },
            },
            { GRIDID: 1, Variable: 1}
        );

        points.toArray((e,d) => {
            console.log(e, d);

            if (e) {
                return res.send({});
            }

            res.json(d);
        });
    } catch (e) {
        console.error(e);
        res.send(e);
    }
};

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/static/demo.html')));
app.get('/demo', (req, res) => res.sendFile(path.join(__dirname + '/static/demo.html')));
app.get('/map', (req, res) => res.sendFile(path.join(__dirname + '/static/map.html')));

app.get('/points', getPoints);
app.get('/points/nearest/:lat/:lng', getNearestPoints);


app.listen(port, () => console.log(`App listening on port ${port}!`));

