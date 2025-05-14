import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchContentDetail } from '@/api/openAPI/utils/fetchContentDetail';
import supabase from '@/api/supabase';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import RabbitFace from '@/components/RabbitFace/RabbitFace';
import { useToast } from '@/hooks/useToast';

function ListItemCardById({
  contentId,
  contentTypeId,
}: {
  contentId: string;
  contentTypeId: string;
}) {
  const { id } = useParams();
  const [item, setItem] = useState<Record<string, string | undefined>>({});
  const [likeAndReview, setLikeAndReview] = useState({ likes: 0, reviews: 0 });
  const [isCheck, setIsCheck] = useState(true);
  const showToast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchContentDetail(contentId, contentTypeId);
        setItem(data);
      } catch (error) {
        console.error('❌ fetchContentDetail 에러:', error);
      }
    };

    const getLikesAndReviews = async () => {
      const { data, error } = await supabase
        .from('ex_contents')
        .select('likes, reviews, ex_favorite(folder_id)')
        .eq('contentid', contentId)
        .maybeSingle();

      if (error) {
        console.log('❌ getLikesAndReviews 에러:', error);
        return;
      }

      setLikeAndReview({
        likes: data?.likes ?? 0,
        reviews: data?.reviews ?? 0,
      });
    };

    fetchData();
    getLikesAndReviews();
  }, [contentId, contentTypeId]);

  if (!item.title) return <p>불러오는 중...</p>; // 추후 스켈레톤으로 변경

  /* 🍞 찜 기능 - 토스트 */
  const deleteToast = () => {
    showToast(
      '삭제하지 못했어요. 잠시 후 다시 시도해 주세요.',
      'top-[64px]',
      4000,
    );
  };
  const addToast = () => {
    showToast(
      '추가하지 못했어요. 잠시 후 다시 시도해 주세요.',
      'top-[64px]',
      4000,
    );
  };

  /* ⏳ 찜 기능 - DB연결 */
  const addFavorite = async (folderId: string, contentId: string) => {
    return await supabase
      .from('ex_favorite')
      .insert([{ folder_id: folderId, content_id: contentId }]);
  };
  const removeFavorite = async (folderId: string, contentId: string) => {
    return await supabase
      .from('ex_favorite')
      .delete()
      .match({ folder_id: folderId, content_id: contentId });
  };

  /* 🕹️ 찜 기능 - 실행 */
  const handleFavorite = async (contentId: string) => {
    if (!id) return;

    if (isCheck) {
      try {
        const { error } = await removeFavorite(id, contentId);

        if (error) {
          deleteToast();
          console.error('❌ 즐겨찾기 삭제 실패:', error);
          return;
        }

        setIsCheck(false);
        setLikeAndReview((prev) => ({
          likes: Math.max((prev.likes ?? 0) - 1, 0),
          reviews: prev.reviews,
        }));
      } catch (err) {
        deleteToast();
        console.error('❌ 삭제 중 에러:', err);
        setIsCheck(true);
      }
    } else {
      try {
        const { error } = await addFavorite(id, contentId);

        if (error) {
          addToast();
          console.error('❌ 즐겨찾기 추가 실패:', error);
          return;
        }
        setIsCheck(true);
        setLikeAndReview((prev) => ({
          likes: (prev.likes ?? 0) + 1,
          reviews: prev.reviews,
        }));
      } catch (err) {
        addToast();
        console.error('❌ 즐겨찾기 추가 실패:', err);
        setIsCheck(false);
      }
    }
  };

  const changeDate = (date: string) => {
    const yy = date.slice(0, 4);
    const mm = date.slice(4, 6);
    const dd = date.slice(6, 8);

    return `${yy}.${mm}.${dd}`;
  };

  let periodInfo = '정보 없음';
  switch (contentTypeId) {
    case '12':
      periodInfo = item?.usetime ?? '';
      break;
    case '14':
      periodInfo = item?.usetimeculture ?? '';
      break;
    case '15':
      periodInfo = `${changeDate(item?.eventstartdate ?? '')} ~ ${changeDate(item?.eventenddate ?? '')}`;
      break;
    case '28':
      periodInfo = item?.usetimeleports ?? '';
      break;
    case '32':
      periodInfo = `체크인: ${item?.checkintime} ~ 체크아웃: ${item?.checkouttime}`;
      break;
    case '38':
      periodInfo = item?.opentime ?? '';
      break;
    case '39':
      periodInfo = item?.opentimefood ?? '';
      break;
    default:
      periodInfo = '정보 없음';
      break;
  }

  if (periodInfo.includes('<br>') && periodInfo.includes('~')) {
    const info = `${periodInfo.split('<br>')[0]}`;
    periodInfo = `${info.split('~')[0]} ~ ${info.split('~')[1]}`;
  } else if (periodInfo.includes('~')) {
    periodInfo = `${periodInfo.split('~')[0]} ~ ${periodInfo.split('~')[1]}`;
  } else if (periodInfo.includes('-')) {
    periodInfo = `${periodInfo.split('-')[0]} ~ ${periodInfo.split('-')[1]}`;
  }

  return (
    <li>
      <Link
        to={`/contents/${contentId}`}
        className="flex-start relative flex w-full items-center gap-4"
      >
        <div className="bg-primary/10 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl object-cover">
          {item.image ? (
            <img src={item.image} alt={item.title} className="h-full w-full" />
          ) : (
            <RabbitFace alt="이미지 준비 중입니다." />
          )}
        </div>
        <div className="flex w-0 flex-1 flex-col">
          <div className="flex items-center justify-between">
            <h3
              className="fs-14 ls lh w-full truncate font-semibold text-black"
              aria-label={item.title}
            >
              {item.title}
            </h3>
            <Button
              variant="tertiary"
              size="md"
              className='m-0.5 h-6 w-6 [&_svg:not([class*="size-"])]:size-5'
              onClick={(e) => {
                e.preventDefault();
                handleFavorite(contentId);
              }}
              aria-label={isCheck ? '즐겨찾기 취소' : '즐겨찾기 추가'}
              aria-live="polite"
            >
              <Icon
                id={isCheck ? 'favorite_on' : 'favorite_off'}
                className="text-primary"
              />
            </Button>
          </div>
          <span className="fs-14 ls lh font-regular text-gray07">
            {periodInfo}
          </span>
          <span className="fs-14 ls lh font-regular text-gray07 inline-flex items-center">
            {item.region}
            <Icon id="chevron_right" size={16} className="text-gray07" />
            {item.district}
          </span>
          <dl className="fs-14 ls lh font-regular text-gray07 flex items-center gap-2">
            <div className="flex items-center gap-1" aria-label="즐겨찾기 수">
              <dt>
                <Icon id="favorite_off" size={16} />
              </dt>
              {likeAndReview.likes !== undefined && (
                <dd className="align-top">
                  {likeAndReview.likes >= 999 ? '999+' : likeAndReview.likes}
                </dd>
              )}
            </div>
            <div className="flex items-center gap-1" aria-label="리뷰 수">
              <dt>
                <Icon id="review" size={16} />
              </dt>
              {likeAndReview.reviews !== undefined && (
                <dd className="align-top">
                  {likeAndReview.reviews >= 999
                    ? '999+'
                    : likeAndReview.reviews}
                </dd>
              )}
            </div>
          </dl>
        </div>
      </Link>
    </li>
  );
}

export default ListItemCardById;
