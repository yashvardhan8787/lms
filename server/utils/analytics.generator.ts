import { Document, Model } from "mongoose";

interface MonthData {
  month: string;
  count: number;
}

export async function generateLast12MothsData<T extends Document>(
  model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
  const last12Months: MonthData[] = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1);

    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    const monthYear = startDate.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    last12Months.unshift({ month: monthYear, count });
  }

  return { last12Months };
}
