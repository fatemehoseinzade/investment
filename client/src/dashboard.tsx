import { useEffect, useState } from "react";
import { Card, CardContent, Table, TableHead, TableHeader, TableRow, TableCell, TableBody  } from "./components/ui";
import { NewInvestorForm } from "./components/forms/new-investor-form";
import { getFundData } from "./api/api";
import type { FundSummary } from "./types/type";
import { ProfitAndLoss } from "./components/forms";

export default function InvestmentFundDashboard()
{

    const [data , setData] = useState<FundSummary | null>(null);
    const getData = async () => {
       const response =  await getFundData();
         console.log(response)
         setData(response)
    }

    useEffect(() => {
        getData()
    }, [])

    if (data == null) { 
        return (
            <div>
                <h5>Loading ... </h5>
            </div>
        )
    }

    const {NAV : nav,investors,totalUnits,unitPrice} = data;
    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold">Investment Fund Dashboard</h1>

            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm">Net Asset Value (NAV)</p>
                        <p className="text-xl font-bold">{nav.toFixed(2)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm">Unit Price</p>
                        <p className="text-xl font-bold">{unitPrice.toFixed(2)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm">Total Units</p>
                        <p className="text-xl font-bold">{totalUnits.toFixed(2)}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <NewInvestorForm refresh={getData}/>

               <ProfitAndLoss refresh={getData}/>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2 text-left">Investors</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Units</TableHead>
                            <TableHead>Current Value</TableHead>
                            <TableHead>Ownership Percentage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {investors.map((inv) => (
                            <TableRow key={inv.name}>
                                <TableCell>{inv.name}</TableCell>
                                <TableCell>{inv.units.toFixed(2)}</TableCell>
                                <TableCell>{inv.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                    {((inv.amount / nav) * 100).toFixed(1)}%
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
