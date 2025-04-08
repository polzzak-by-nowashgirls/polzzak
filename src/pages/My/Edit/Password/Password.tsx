import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';

function Password() {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <Input
          label="현재 비밀번호"
          placeholder="현재 비밀번호를 적어주세요."
        />
      </div>
      <div>
        <Input
          label="변경할 비밀번호"
          placeholder="변경할 비밀번호를 적어주세요."
        />
      </div>
      <div>
        <Input
          label="변경할 비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해 주세요."
        />
      </div>
      <Button disabled variant={'default'}>
        저장
      </Button>
    </section>
  );
}

export default Password;
