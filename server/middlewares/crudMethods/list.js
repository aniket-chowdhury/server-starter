const colors = require(__dirname + '/../../colors');

module.exports = (data)=>{
    const Item = data['model'];
    return (req, res, next) => {
            Item.find({}, (err, docs) => {
                if (err) {
                    console.log(colors.error(`--- ${err}`));
                    res.status(502).send('Bad Gateway. Data Response Failure.');
                } else {
                    res.status(200).json(docs);
                }
            });
        }    
    
}