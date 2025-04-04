// import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Icon, { type IconId } from '@/components/Icon/Icon';

interface HeaderProps {
  title: string;
  subTitle?: string;
  editHide?: boolean;
  iconId?: IconId;
}

function Header({ title, subTitle, editHide = false, iconId }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get('mode') || 'list';
  const isEditMode = mode === 'edit';

  const toggleEditMode = () => {
    const newMode = isEditMode ? 'list' : 'edit';
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('mode', newMode);
      return params;
    });
  };

  return (
    <header
      className={`flex h-12 items-center justify-start bg-white shadow-xs ${isHome ? 'px-4' : 'px-2'}`}
    >
      <div className="flex flex-1 items-center justify-start gap-2">
        <h1 className="fs-16 ls lh font-semibold text-black">{title}</h1>
        {subTitle && (
          <span className="fs-14 font-regular text-gray07 ls lh">
            {subTitle}
          </span>
        )}
      </div>
      {!isHome && (
        <Button
          type="button"
          variant={'tertiary'}
          className={isHome ? 'hidden' : 'order-first'}
          size="md"
          aria-label="이전 페이지로 이동"
          onClick={() => navigate(-1)}
        >
          <Icon id="arrow_left" />
        </Button>
      )}
      {editHide === false ? (
        <Button
          type="button"
          onClick={toggleEditMode}
          variant="tertiary"
          aria-label={`${isEditMode ? '완료' : '편집'} 모드로 전환`}
        >
          {isEditMode ? '완료' : '편집'}
        </Button>
      ) : iconId ? (
        <Button
          type="button"
          variant="tertiary"
          size="md"
          aria-label={`${iconId} 버튼`}
          onClick={() => navigate(`/search`)}
        >
          <Icon id={iconId} />
        </Button>
      ) : null}
    </header>
  );
}

export default Header;
