var ObjectId = require('mongodb').ObjectID;
class Inspector {
    inspectionCompanyPipeline() {
        return [
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user"
                }
            },
            {
                $lookup: {
                    from: "searchtags",
                    let: { refId: "$_id" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $eq: ["$refId", "$$refId"] },
                                            { $eq: ["$type", "inspector"] }
                                        ]
                                }
                            }
                        },
                    ],
                    as: "tags"
                }
            }
        ]
    }
}

module.exports = { Inspector };