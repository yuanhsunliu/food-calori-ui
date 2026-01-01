export interface FoodEntry {
  id: number;
  timestamp: string;
  food_name: string;
  calories: number;
  notes: string;
}

export interface FoodListResponse {
  total: number;
  entries: FoodEntry[];
}

export interface CreateFoodRequest {
  food_name: string;
  calories: number;
  timestamp: string;
  notes: string;
}
