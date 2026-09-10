import ComponentLab from './ComponentLab';
import Hero from './Hero';

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <ComponentLab />
    </div>
  );
}
