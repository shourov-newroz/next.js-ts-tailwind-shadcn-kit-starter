import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
      <h1 className='text-4xl font-bold text-blue-600 mb-4'>Hello World</h1>
      <Button className='bg-primary hover:bg-primary/90'>Click me</Button>
    </div>
  );
}
