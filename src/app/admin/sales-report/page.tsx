
"use client";

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Bot, Copy, FileJson, AreaChart } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { generateReportAction } from "@/app/admin/sales-report/actions";
import { withProtected } from '@/context/auth-provider';


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Generating...' : 'Generate Report'}
        </Button>
    );
}

function SalesReportGenerator({ generateReportAction }: { generateReportAction: (formData: FormData) => Promise<{ report: string | null; error: string | null; }> }) {
    const [report, setReport] = useState<string | null>(null);
    const { toast } = useToast();

    const handleAction = async (formData: FormData) => {
        setReport(null); // Clear previous report
        const res = await generateReportAction(formData);
        if (res.error) {
            toast({
                variant: "destructive",
                title: "An error occurred",
                description: res.error,
            });
        } else {
            setReport(res.report);
        }
    };
    
    const handleCopy = () => {
        if(report) {
            navigator.clipboard.writeText(report);
            toast({ title: 'Report copied to clipboard!'});
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <form action={handleAction} className="space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileJson className="h-5 w-5" />
                            Input Data
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label htmlFor="orderData" className="block text-sm font-medium mb-1">Order Data (JSON)</label>
                            <Textarea
                                id="orderData"
                                name="orderData"
                                rows={10}
                                placeholder='[{"orderId": "123", "items": [...]}]'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="vendorSalesData" className="block text-sm font-medium mb-1">Vendor Sales Data (JSON)</label>
                            <Textarea
                                id="vendorSalesData"
                                name="vendorSalesData"
                                rows={10}
                                placeholder='[{"vendorId": "abc", "totalSales": 5000}]'
                                required
                            />
                        </div>
                    </CardContent>
                </Card>
                <SubmitButton />
            </form>
            <div className="space-y-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                         <CardTitle className="flex items-center gap-2">
                            <AreaChart className="h-5 w-5" />
                            Generated Report
                        </CardTitle>
                        {report && (
                            <Button variant="ghost" size="icon" onClick={handleCopy}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent className="min-h-[300px]">
                        {report ? (
                            <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                                {report}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                                <Bot className="h-12 w-12 mb-4" />
                                <p>Your generated sales report will appear here.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


function SalesReportPage() {
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


export default withProtected(SalesReportPage);
