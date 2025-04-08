import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';

function NickName() {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div>
          <Input label="닉네임" />
        </div>
        <Button
          variant={'tertiary'}
          className="s-13 text-gray06 absolute top-[5px] left-12 h-5 px-1"
          size="sm"
        >
          랜덤생성
          <Icon id="replay" className="text-gray05" />
        </Button>
      </div>
      <Button variant={'default'} disabled>
        저장
      </Button>
    </div>
  );
}

export default NickName;
