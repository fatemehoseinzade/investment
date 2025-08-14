import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { profitAndLoss } from '../../api/api';

export const ProfitAndLoss = ({refresh } : {refresh: () =>void }) => {
    const [amount ,setAmount] = useState(0);

    const handleProfitLoss = async () => {
        await profitAndLoss({amount});

        refresh()
        setAmount(0);
    }
  return (
      <div className="space-y-2">
                        <Input
                            placeholder="Profit/Loss"
                            value={amount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
                            type="number"
                        />
                        <Button onClick={handleProfitLoss}>Apply Profit/Loss</Button>
                    </div>
  )
}
