import React from 'react';
import { Card } from '@/components/ui/card';
import { FoodEntry } from '@/types/food';

interface CalorieListDisplayProps {
  entries: FoodEntry[];
  isLoading: boolean;
}

export const CalorieListDisplay: React.FC<CalorieListDisplayProps> = ({ entries, isLoading }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-500">載入中...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-500">請輸入第一筆食物資料</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="divide-y divide-gray-200">
        {entries.map((entry) => (
          <Card key={entry.id} className="p-4 hover:bg-gray-50 transition-colors border-0 rounded-none shadow-none">
            <div className="font-medium text-gray-900 mb-1">{entry.food_name}</div>
            <div className="text-sm text-gray-600 mb-1">
              熱量：{entry.calories} 大卡
            </div>
            <div className="text-xs text-gray-500">
              建立時間：{formatTimestamp(entry.timestamp)}
            </div>
            {entry.notes && (
              <div className="text-xs text-gray-500 mt-1">
                備註：{entry.notes}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
