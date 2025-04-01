import MenuItem from '@/components/My/MenuItem';

const menus = [
  { label: '닉네임 설정', href: 'nickname' },
  { label: '비밀번호 설정', href: 'password' },
  { label: '휴대폰 번호 설정', href: 'phone-number' },
  { label: '이메일 설정', href: 'email' },
];

function Edit() {
  return (
    <section>
      <h1 className="sr-only">내 정보</h1>
      <MenuItem menus={menus} />
    </section>
  );
}

export default Edit;
