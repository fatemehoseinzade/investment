import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { invest } from '../../api/api';

export const NewInvestorForm = ({refresh} : {refresh:() => void}) => {

    const [amount, setAmount] = useState(0);
    const [newInvestor, setNewInvestor] = useState('');

    const handleInvest = async () => {

        if(amount === 0) { 
            console.log('amount must be grater than 0!')
            return;
        }
        if(newInvestor.trim() === '') {
            console.log('investor name is empty!')
             return;
        }
        await invest({investor_name : newInvestor, amount});
        refresh()
        resetForm()
    }

    const resetForm = () => {
        setAmount(0);
        setNewInvestor('')
    }

  return (
     <div className="space-y-2">
        <Input
            placeholder="Investor Name"
            value={newInvestor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInvestor(e.target.value)}
        />
        <Input
            placeholder="Investment Amount"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
            type="number"
        />
        <Button onClick={handleInvest}>Add Investment</Button>
    </div>
  )
}
