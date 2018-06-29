class Lawyer {
    lawyerCompanyPipeline() {
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
                                            { $eq: ["$type", "lawyer"] }
                                        ]
                                }
                            }
                        },
                    ],
                    as: "tags"
                }
            },
            {
                $lookup: {
                    from : "lawyercompanyservices",
                    localField: "_id",
                    foreignField: "lawyerCompanyId",
                    as: "services"
                }
            },
            {
                $lookup: {
                    from: "socialnetworks",
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
                                            { $eq: ["$type", "lawyer"] }
                                        ]
                                }
                            }
                        },
                    ],
                    as: "social"
                }
            },
        ]
    }
}

module.exports = { Lawyer };