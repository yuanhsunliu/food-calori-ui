import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { FoodInputForm } from '@/components/FoodInputForm';
import { CalorieListDisplay } from '@/components/CalorieListDisplay';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { foodApi } from '@/services/api';
import { FoodEntry } from '@/types/food';

function App() {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFoods = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await foodApi.getFoods();
      const sortedEntries = [...response.entries].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setEntries(sortedEntries);
    } catch (err) {
      setError('無法連線到伺服器，請確認後端服務是否正常運作');
      console.error('Failed to load foods:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleSubmit = async (data: { food_name: string; calories: number; notes: string }) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const timestamp = new Date().toISOString();
      
      await foodApi.addFood({
        ...data,
        timestamp,
      });
      
      await loadFoods();
    } catch (err) {
      setError('新增食物失敗，請稍後再試');
      console.error('Failed to add food:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100" style={{ width: '300px', height: '500px' }}>
      <Header />
      
      {error && (
        <Alert variant="destructive" className="rounded-none border-x-0">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <FoodInputForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      
      <CalorieListDisplay entries={entries} isLoading={isLoading} />
    </div>
  );
}

export default App;
