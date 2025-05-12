import { useEffect, useState } from 'react';

import { fetchContentDetail } from '@/api/openAPI/utils/fetchContentDetail';
import { formatDate } from '@/lib/formatDate';
import {
  CourseDetail,
  CulturalDetail,
  FestivalDetail,
  FoodDetail,
  HotelDetail,
  LeportsDetail,
  ShoppingDetail,
  TourDetail,
} from '@/types/categoryDetailType';
import { DetailCommonDataType } from '@/types/detailCommonDataType';

import RabbitFace from '../RabbitFace/RabbitFace';
import { detailItems } from './DetailItems';

interface ModalDetailContent {
  data?: DetailCommonDataType | null;
  contentId?: string;
}

type TourDataDetail =
  | FoodDetail
  | FestivalDetail
  | TourDetail
  | LeportsDetail
  | ShoppingDetail
  | HotelDetail
  | CulturalDetail
  | CourseDetail;

export default function ModalDetailContent({
  data,
  contentId,
}: ModalDetailContent) {
  const [detail, setDetail] = useState<TourDataDetail | null>(null);

  useEffect(() => {
    function isTourDataDetail(data: unknown): data is TourDataDetail {
      return typeof data === 'object' && data !== null && 'title' in data;
    }

    if (contentId && data?.contenttypeid) {
      fetchContentDetail(contentId, data.contenttypeid, true).then((res) => {
        if (isTourDataDetail(res)) {
          setDetail(res);
        } else {
          console.warn('Unexpected detail type:', res);
        }
      });
    }
  }, [contentId, data?.contenttypeid]);

  return (
    <>
      {detail && (
        <div className="text-gray07 flex flex-col gap-2 text-sm">
          {data?.firstimage ? (
            <img
              src={data.firstimage}
              alt={data.title}
              className="h-full w-full"
            />
          ) : (
            <RabbitFace alt="이미지 준비 중입니다." />
          )}
          <dl className="fs-15 mt-4 flex flex-col gap-2">
            {data?.addr1 && (
              <div className="flex gap-4">
                <dt className="fs-14 text-gray06 w-18">주소</dt>
                <dd className="text-black">
                  {data.addr1} {data.addr2 && data.addr2}
                </dd>
              </div>
            )}

            {detailItems.map(({ key, label, format }) => {
              if (!detail || !(key in detail)) return null;

              const value = detail[key as keyof typeof detail];
              if (!value) return null;

              // 행사 기간은 별도로 처리 + contentTypeId 기준으로 타입 좁히기
              if (
                key === 'eventstartdate' &&
                'eventstartdate' in detail &&
                'eventenddate' in detail
              ) {
                return (
                  <div key={key} className="flex gap-4">
                    <dt className="fs-14 text-gray06 w-18">{label}</dt>
                    <dd className="text-black">
                      {formatDate(detail.eventstartdate as string)} ~{' '}
                      {formatDate(detail.eventenddate as string)}
                    </dd>
                  </div>
                );
              }

              return (
                <div key={key} className="flex gap-4">
                  <dt className="fs-14 text-gray06 w-18">{label}</dt>
                  <dd className="text-black">
                    {format ? format(value as string) : value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      )}
    </>
  );
}
