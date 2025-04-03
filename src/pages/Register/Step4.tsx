import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import SelectMenu from '@/components/Input/SelectMenu';
import { Label } from '@/components/Label';

function Step4() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Label>이메일</Label>
        <div className="flex items-center justify-center gap-1">
          <div className="flex-1">
            <Input
              label="이메일 아이디"
              hideLabel={true}
              type="text"
              placeholder="email"
            />
          </div>
          <span className="fs-14 text-gray06">@</span>
          <div className="flex-1">
            <Input
              label="이메일 도메인"
              hideLabel={true}
              type="text"
              placeholder="직접 입력"
            />
          </div>
        </div>
      </div>
      <SelectMenu data={'email'} />
      <Button
        onClick={() => {
          navigate('/register/5');
        }}
      >
        다음
      </Button>
    </>
  );
}

export default Step4;
