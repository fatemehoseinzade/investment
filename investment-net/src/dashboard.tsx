import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";

export default function InvestmentFundDashboard()
{
    const [investors, setInvestors] = useState([
        { name: "A", units: 1000, value: 1200 },
        { name: "B", units: 1000, value: 1200 },
    ]);
    const [nav, setNav] = useState(2400);
    const [totalUnits, setTotalUnits] = useState(2000);
    const [newInvestor, setNewInvestor] = useState("");
    const [amount, setAmount] = useState("");
    const [profitLoss, setProfitLoss] = useState("");

    const unitPrice = nav / totalUnits;

    const handleInvest = () =>
    {
        const amt = parseFloat(amount);
        if (!newInvestor || isNaN(amt) || amt <= 0) return;

        const units = amt / unitPrice;
        const existing = investors.find((i) => i.name === newInvestor);
        const updatedInvestors = existing
            ? investors.map((i) =>
                i.name === newInvestor
                    ? {
                        ...i,
                        units: i.units + units,
                        value: (i.units + units) * unitPrice,
                    }
                    : i
            )
            : [
                ...investors,
                { name: newInvestor, units, value: units * unitPrice },
            ];

        setInvestors(updatedInvestors);
        setNav(nav + amt);
        setTotalUnits(totalUnits + units);
        setNewInvestor("");
        setAmount("");
    };

    const handleProfitLoss = () =>
    {
        const pl = parseFloat(profitLoss);
        if (isNaN(pl)) return;
        const newNAV = Math.max(0, nav + pl);
        const updatedInvestors = investors.map((i) => ({
            ...i,
            value: i.units * (newNAV / totalUnits),
        }));
        setNav(newNAV);
        setInvestors(updatedInvestors);
        setProfitLoss("");
    };

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
                <div className="space-y-2">
                    <Input
                        placeholder="Investor Name"
                        value={newInvestor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInvestor(e.target.value)}
                    />
                    <Input
                        placeholder="Investment Amount"
                        value={amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                        type="number"
                    />
                    <Button onClick={handleInvest}>Add Investment</Button>
                </div>

                <div className="space-y-2">
                    <Input
                        placeholder="Profit/Loss"
                        value={profitLoss}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfitLoss(e.target.value)}
                        type="number"
                    />
                    <Button onClick={handleProfitLoss}>Apply Profit/Loss</Button>
                </div>
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
                                <TableCell>{inv.value.toFixed(2)}</TableCell>
                                <TableCell>
                                    {((inv.value / nav) * 100).toFixed(1)}%
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
