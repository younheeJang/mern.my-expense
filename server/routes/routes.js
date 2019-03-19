let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let Expense = require('../../models/Expense');

router.get('/', (req, res) => {
    res.render('index');
});

router.route('/expense')
    .post((req, res) => {
        let expense = new Expense();
        expense.description = req.body.desc;
        expense.amount = req.body.amount;
        expense.month = req.body.month;
        expense.year = req.body.year;
        expense.save((err) => {
            if (err) res.send(err);
            res.send('Expense successfully added ' + res)
        });
    })
    .put((req, res) => {
        const doc = {
            description: req.body.description,
            amount: req.body.amount,
            month: req.body.month,
            year: req.body.year
        };
        console.log(doc);
        Expense.update({ _id: req.body._id }, doc, (err, result) => {
            if (err) res.send(err);
            res.send('Expense successfully updated ' + result)
        });
    })
    .delete((req, res) => {
        let id = req.query.id;
        Expense.find({ _id: id }).remove().exec((err, expense) => {
            if (err) res.send(err)
            res.send('Expense successfully deleted! ' + expense)
        });
    })
    .get((req, res) => {
        let monthRec = req.query.month;
        let yearRec = req.query.year;
        if (monthRec && monthRec !== 'All') {
            Expense.find({ $and: [{ month: monthRec }, { year: yearRec }] },
                (err, expenses) => {
                    if (err) res.send(err);
                    res.json(expenses);
                });
        } else {
            Expense.find({ year: yearRec }, (err, expenses) => {
                if (err) res.send(err);
                res.json(expenses);
            });
        }
    });

module.exports = router;