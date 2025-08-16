import { SalesReportGenerator } from "@/components/sales-report-generator";
import { generateSalesReport } from "@/ai/flows/sales-report-generator";
import type { GenerateSalesReportInput } from "@/ai/flows/sales-report-generator";

async function generateReportAction(formData: FormData): Promise<{ report: string | null; error: string | null; }> {
    "use server";
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

export default function SalesReportPage() {
    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-2 font-headline">Sales Report Generator</h1>
            <p className="text-muted-foreground mb-8">
                Generate sales insights using AI. Paste your order and vendor data to get started.
            </p>
            <SalesReportGenerator generateReportAction={generateReportAction} />
        </div>
    );
}
