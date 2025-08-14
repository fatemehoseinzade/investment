import axios from 'axios';
import type { FundSummary } from '../types/type';

const API_BASE_URL = 'http://localhost:3001';

// نمونه‌سازی Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// تابع سرمایه‌گذاری
export const invest = async ({investor_name , amount}:{investor_name: string, amount: number}) => {
  try {
    const response = await api.post('/invest', { investor_name, amount });
    return response.data;
  } catch (error: any) {
    console.error('Invest API error:', error.response?.data || error.message);
    throw error;
  }
};

// تابع گرفتن اطلاعات صندوق
export const getFundData = async () : Promise<FundSummary>  => {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error: any) {
    console.error('Get Fund Data API error:', error.response?.data || error.message);
    throw error;
  }
};


export const profitAndLoss =async ({amount} : {amount:number}) : Promise<void> => {
    try{
        const response = await api.post('/profit' ,{amount});
        return response.data;
    }
     catch (error: any) {
    console.error('Get Fund Data API error:', error.response?.data || error.message);
    throw error;
  }
}