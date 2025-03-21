interface StepProps {
  step: number;
}

const STEP_LIST = [
  {
    step: 1,
    title: ['로그인에 사용할 아이디를 입력해 주세요.'],
  },
  {
    step: 2,
    title: ['로그인에 사용할 비밀번호를 입력해 주세요.'],
  },
  {
    step: 3,
    title: ['본인 확인을 위해', '휴대폰 번호를 입력하고 인증해 주세요.'],
  },
  {
    step: 4,
    title: ['계정과 관련된 중요한 알림을 받을', '이메일 주소를 입력해 주세요.'],
  },
  {
    step: 5,
    title: ['폴짝에서 사용할 닉네임을 입력해 주세요.'],
  },
];

function Step({ step }: StepProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-14 text-regular text-gray06 flex items-center justify-start">
        <strong className="text-18 text-semibold text-primary mr-[0.1875rem]">
          {step}
        </strong>
        <span>/ 5</span>
      </div>
      <h3 className="text-16 font-semibold text-black">
        {STEP_LIST[step - 1].title.map((line, index) => (
          <span key={index}>
            {line}
            {index !== STEP_LIST[step - 1].title.length && <br />}
          </span>
        ))}
      </h3>
    </div>
  );
}

export default Step;
