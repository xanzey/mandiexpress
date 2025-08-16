
"use server";

import { generateSalesReport } from "@/ai/flows/sales-report-generator";
import type { GenerateSalesReportInput } from "@/ai/flows/sales-report-generator";

export async function generateReportAction(formData: FormData): Promise<{ report: string | null; error: string | null; }> {
    const orderData = formData.get('orderData') as string;
    const vendorSalesData = formData.get('vendorSalesData') as string;

    if (!orderData || !vendorSalesData) {
        return { report: null, error: "Please provide both order data and vendor sales data." };
    }
    
    try {
        const input: GenerateSalesReportInput = { orderData, vendorSalesData };
        const result = await generateSalesReport(input);
        return { report: result.report, error: null };
    } catch (e: any) {
        console.error(e);
        return { report: null, error: e.message || 'Failed to generate report.' };
    }
}
