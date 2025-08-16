
"use client";

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Bot, Copy } from "lucide-react";
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
