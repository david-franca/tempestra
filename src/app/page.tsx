import { Now } from '@/components/Now';

export default function Home() {
  return (
    <main className="flex min-h-screen backdrop-blur bg-cloud bg-no-repeat bg-cover bg-center bg-fixed flex-col items-center justify-between">
      <Now />
    </main>
  );
}
