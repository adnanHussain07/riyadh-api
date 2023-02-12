const History = require('../model/history')
const User = require('../model/user')
const Item = require('../model/model')
// var name


const logs = async (req, res) => {
    try {
        const { itemid, rentee, name, rentee_id, pageNo, count, SerialNo } = req.query
        ///console.log(req.query)
        //console.log(featured)
        const queryObject = {}
        //yahan jis feature ko search krogy us feature k products show hongy mere case mein feature (true or false)
        //hain, true search krny pr sirf ture feature waly products result mein aengy
        if (SerialNo) {
            queryObject.SerialNo = SerialNo
        }
        if (itemid) {
            queryObject.itemid = itemid
        }
        if (rentee) {
            queryObject.rentee = rentee
        }
        if (rentee_id) {
            queryObject.rentee_id = rentee_id
        }
        if (name) {
            queryObject.name = { $regex: name, $options: 'i' }
        }
        //yahan jis company ka search krogy us company k products show honge
        // if (status) {
        //     queryObject.status = status
        // }
        //yahan jis name se search krogy us name k sary products result mein aengy
        // if (name) {
        //     queryObject.name = { $regex: name, $options: 'i' }
        // }



        const length = await History.countDocuments(queryObject);
        let result = History.find(queryObject).sort({ createdAt: 'desc' });

        const page = Number(pageNo) || 1
        const limit = Number(count) || 10
        // const page = Number(req.query.page) || 1
        // const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit

        result = result.skip(skip).limit(limit)

        //console.log(queryObject)
        const historyResult = await result;
        let history = historyResult;
        if (history && history.length > 0) {
            let itemIDs = [];
            history.map(e => {
                itemIDs.push(e.itemid);
            });
            if (itemIDs && itemIDs.length > 0) {
                const itemss = Item.find({
                    itemid: {
                        $in: itemIDs
                    }
                });
                const allItems = await itemss;
                if (allItems && allItems.length > 0) {
                    // allItems.map(zz=> {
                    //     // con
                    // })
                    history.map(xx => {
                        const iitem = allItems.filter(gg => gg.itemid == xx.itemid);
                        if (iitem && iitem.length > 0) {
                            xx.name = iitem[0].name;
                            xx.SerialNo = iitem[0].SerialNo;
                        }
                    });
                }
            }
        }
        res.status(200).json({ history, nbHits: history.length, total: length ? length : 0 })
    } catch (ex) {
        res.status(200).json({ error: "API_CRASHED" })
    }




}




module.exports = {
    logs

}