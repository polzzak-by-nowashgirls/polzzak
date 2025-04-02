import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import SelectMenu from '@/components/Input/SelectMenu';

function Email() {
  return (
    <section className="flex flex-col gap-6">
      <div className="relative flex items-center">
        <div>
          <Input label="이메일" />
        </div>
        <span className="relative translate-y-1/2 transform">@</span>
        <div>
          <Input label="　" />
        </div>
      </div>
      <SelectMenu data={'email'} />
      <Button disabled>저장</Button>
    </section>
  );
}

export default Email;
