import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface FoodInputFormProps {
  onSubmit: (data: { food_name: string; calories: number; notes: string }) => void;
  isSubmitting: boolean;
}

export const FoodInputForm: React.FC<FoodInputFormProps> = ({ onSubmit, isSubmitting }) => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ foodName?: string; calories?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { foodName?: string; calories?: string } = {};
    
    if (!foodName.trim()) {
      newErrors.foodName = '請輸入食物名稱';
    }
    
    const caloriesNum = parseInt(calories);
    if (!calories || isNaN(caloriesNum) || caloriesNum < 0 || caloriesNum > 9999) {
      newErrors.calories = '請輸入 0-9999 之間的整數';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit({
      food_name: foodName.trim(),
      calories: caloriesNum,
      notes: notes.trim(),
    });
    
    setFoodName('');
    setCalories('');
    setNotes('');
    setErrors({});
  };

  return (
    <Card className="border-b border-gray-200 rounded-none shadow-none">
      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <div className="space-y-2">
          <Label htmlFor="foodName">食物名稱</Label>
          <Input
            id="foodName"
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="例如：雞胸肉"
            disabled={isSubmitting}
          />
          {errors.foodName && (
            <p className="text-sm text-red-600">{errors.foodName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="calories">熱量</Label>
          <Input
            id="calories"
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="例如：165"
            disabled={isSubmitting}
            min="0"
            max="9999"
            step="1"
          />
          {errors.calories && (
            <p className="text-sm text-red-600">{errors.calories}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">備註（選填）</Label>
          <Input
            id="notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="例如：烤雞胸肉, 100g"
            disabled={isSubmitting}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-green-600"
        >
          {isSubmitting ? '送出中...' : '送出'}
        </Button>
      </form>
    </Card>
  );
};
