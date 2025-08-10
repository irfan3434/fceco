import ImageBanner from '@/components/imagebanner';
import ProblemSolutionBanner from '../components/problemsolutionbanner';
import Valuestrip from '../components/Valuestrip';
import HomePage from '@/pages/homepage';
import Staff from '@/components/staff';
import Vision from '@/components/vision';

export default function Home() {
  return (
    <section>
      <HomePage />
      <ProblemSolutionBanner />
      <Vision />
      <Staff />
      <Valuestrip />
    </section>
  );
}

