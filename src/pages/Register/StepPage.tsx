import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import RegisterStep from '@/components/Register/RegisterStep';
import { Step1, Step2, Step3, Step4, Step5 } from '@/pages/Register';

function StepPage() {
  const { step } = useParams();
  const navigate = useNavigate();
  const trimmed = (step ?? '').trim();
  const isValidStep = ['1', '2', '3', '4', '5'].includes(trimmed);

  useEffect(() => {
    if (!isValidStep) {
      navigate('/not-found');
    }
  }, [isValidStep, navigate]);

  if (!isValidStep) return null;

  const stepNumber = parseInt(trimmed);

  let StepComponent = null;
  switch (trimmed) {
    case '1':
      StepComponent = <Step1 />;
      break;
    case '2':
      StepComponent = <Step2 />;
      break;
    case '3':
      StepComponent = <Step3 />;
      break;
    case '4':
      StepComponent = <Step4 />;
      break;
    case '5':
      StepComponent = <Step5 />;
      break;
  }

  return (
    <div className="flex flex-col gap-4">
      <RegisterStep step={stepNumber} />
      {StepComponent}
    </div>
  );
}

export default StepPage;
