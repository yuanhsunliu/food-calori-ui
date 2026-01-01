import { CreateFoodRequest, FoodListResponse } from '../types/food';

const API_BASE_URL = 'http://127.0.0.1:5001/api';

export const foodApi = {
  async addFood(data: CreateFoodRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('新增食物失敗');
    }
  },

  async getFoods(): Promise<FoodListResponse> {
    const response = await fetch(`${API_BASE_URL}/foods`);

    if (!response.ok) {
      throw new Error('取得食物清單失敗');
    }

    return response.json();
  },
};
