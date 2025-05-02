import { useState } from 'react';

import supabase from '@/api/supabase';
import Button from '@/components/Button/Button';
import AlertDialog from '@/components/Dialog/AlertDialog';
import Input from '@/components/Input/Input';
import SelectMenu from '@/components/Input/SelectMenu';
import { Label } from '@/components/Label';
import { validEmail } from '@/lib/validationEmail';
import { useDialogStore } from '@/store/useDialogStore';

function ResetPassword() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputDomain, setInputDomain] = useState('');
  const { isOpen, openModal, closeModal } = useDialogStore();
  const [dialogContent, setDialogContent] = useState<{
    header: string;
    description: string[];
  } | null>(null);

  const isValidEmail =
    inputEmail && inputDomain
      ? validEmail(`${inputEmail}@${inputDomain}`)
      : false;

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value.trim());
  };

  const handleInputDomain = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDomain(e.target.value.trim());
  };

  const onDomainKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isValidEmail) handleSendResetEmail();
    }
  };

  const handleSelectedEmail = (selected: string) => {
    setInputDomain(selected === '직접 입력' ? '' : selected);
  };

  const handleSendResetEmail = async () => {
    const fullEmail = `${inputEmail}@${inputDomain}`;

    const { data: userRow, error: findError } = await supabase
      .from('ex_users')
      .select('email')
      .eq('email', fullEmail)
      .single();

    if (findError || !userRow) {
      // 존재하지 않는 이메일
      setDialogContent({
        header: '이메일이 존재하지 않습니다.',
        description: [
          '입력한 이메일로 가입된 계정이 없습니다.',
          '이메일 주소를 다시 확인해 주세요.',
        ],
      });
      openModal();
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(fullEmail, {
      // ⚠️ redirectTo: '배포 URL로 변경/reset-password-callback',
      redirectTo: 'http://localhost:5173/login/reset-password-callback',
    });

    if (error) {
      // 이메일 발송 실패
      setDialogContent({
        header: '이메일 발송 실패',
        description: [
          '이메일 발송에 실패했습니다.',
          '잠시 후 다시 시도해 주세요.',
        ],
      });
      openModal();
      return;
    }

    setDialogContent({
      // 이메일 발송 성공
      header: '이메일 발송 완료!',
      description: ['비밀번호 재설정 링크가', '이메일로 전송되었습니다.'],
    });
    openModal();
  };

  return (
    <main className="flex flex-1 flex-col gap-4 px-6 py-8">
      <h2 className="font-semibold text-black">
        회원가입 시 등록한 이메일을 입력하고,
        <br />
        이메일 발송 버튼을 눌러주세요.
      </h2>
      <p className="text-gray07 fs-15">
        입력하신 이메일 주소로
        <br />
        비밀번호 재설정 링크를 보내드릴게요!
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label className="p-1">이메일</Label>
          <div className="flex items-center justify-center gap-1">
            <div className="flex-1">
              <Input
                label="이메일 아이디"
                hideLabel={true}
                type="text"
                placeholder="email"
                value={inputEmail}
                onChange={handleInputEmail}
              />
            </div>
            <span className="fs-14 text-gray06">@</span>
            <div className="flex-1">
              <Input
                label="이메일 도메인"
                hideLabel={true}
                type="text"
                placeholder="직접 입력"
                value={inputDomain}
                onKeyDown={onDomainKeyDown}
                onChange={handleInputDomain}
              />
            </div>
          </div>
        </div>
        <SelectMenu
          data={'email'}
          onSelectedEmail={handleSelectedEmail}
          className="flex-1"
        />
        <Button onClick={handleSendResetEmail} disabled={!isValidEmail}>
          이메일 발송
        </Button>
        <p className="fs-14 text-gray07 mt-4 text-center">
          이메일이 기억나지 않으시면, 고객센터(
          <span className="text-primary px-[1px] underline">
            polzzak@gmail.com
          </span>
          )로 문의해주세요.
        </p>
      </div>
      {isOpen && dialogContent && (
        <AlertDialog
          header={dialogContent.header}
          description={dialogContent.description}
          button={[
            {
              text: '확인',
              onClick: () => {
                closeModal();
              },
            },
          ]}
        />
      )}
    </main>
  );
}

export default ResetPassword;
