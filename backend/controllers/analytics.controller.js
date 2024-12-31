import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const getAnalyticsData = async () => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData = await Order.aggregate([
        {
            $group: {
                _id: null, // Group by null to get total sales
                totalSales: { $sum: 1 }, // Count the number of orders
                totalRevenue: { $sum: "$totalAmount" }
            }
        }
    ]);

    const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };

    return {
        Users: totalUsers,
        Products: totalProducts,
        totalSales,
        totalRevenue
    }
};


export const getDailySalesData = async (startDate, endDate) => {
    try {
        const dailySalesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sales: { $sum: 1 },
                    revenue: { $sum: "$totalAmount" }
                },
            },
            { $sort: { _id: 1 } },
        ]);

        //example output
        //[
        //  {
        //    _id: "2023-08-01",
        //    sales: 5,
        //    revenue: 100
        //  },
        //  {
        //    _id: "2023-08-02",
        //    sales: 3,
        //    revenue: 50
        //  },

        const dateArray = getDatesInRange(startDate, endDate);
        //example output
        //["2023-08-01", "2023-08-02", "2023-08-03", "2023-08-04", "2023-08-05", "2023-08-06", "2023-08-07"];

        return dateArray.map(date => {
            const foundData = dailySalesData.find(item => item._id === date);

            return {
                date,
                sales: foundData?.sales || 0,
                revenue: foundData?.revenue || 0,
            }
        });
    } catch (error) {
        throw error;
    }
}

function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}