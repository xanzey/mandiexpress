"use client";

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Bot, Copy } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface SalesReportGeneratorProps {
    generateReportAction: (formData: FormData) => Promise<{ report: string | null; error: string | null; }>;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Generating...' : 'Generate Report'}
        </Button>
    );
}

export function SalesReportGenerator({ generateReportAction }: SalesReportGeneratorProps) {
    const [result, setResult] = useState<{ report: string | null; error: string | null; }>({ report: null, error: null });
    const { toast } = useToast();

    const handleAction = async (formData: FormData) => {
        const res = await generateReportAction(formData);
        setResult(res);
    };
    
    const handleCopy = () => {
        if(result.report) {
            navigator.clipboard.writeText(result.report);
            toast({ title: 'Report copied to clipboard!'});
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <form action={handleAction} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Input Data</CardTitle>
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
                        <CardTitle>Generated Report</CardTitle>
                        {result.report && (
                            <Button variant="ghost" size="icon" onClick={handleCopy}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent className="min-h-[300px]">
                        {result.error && (
                            <Alert variant="destructive">
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{result.error}</AlertDescription>
                            </Alert>
                        )}
                        {result.report ? (
                            <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                                {result.report}
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
