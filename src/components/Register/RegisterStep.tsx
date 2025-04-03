import { useEffect, useState } from 'react';

import { Progress } from '@/components/Register/progress';
import Step from '@/components/Register/Step';

interface RegisterStepProps {
  step: number;
}

function RegisterStep({ step }: RegisterStepProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(step * 20), step * 100);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="flex flex-col gap-4">
      <Progress value={progress} className="fixed top-12 left-0" />
      <Step step={step} />
    </div>
  );
}

export default RegisterStep;
