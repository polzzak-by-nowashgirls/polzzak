import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import supabase from '@/api/supabase';
import Button from '@/components/Button/Button';
import CalendarCustom from '@/components/Calendar/CalendarCustom';
import Chip from '@/components/Chip/Chip';
import SlideUpDialog from '@/components/Dialog/SlideUpDialog';
import Icon from '@/components/Icon/Icon';
import { ImageCropper } from '@/components/Input/ImageCropper';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';
import Loader from '@/components/Loader/Loader';
import { useToast } from '@/hooks/useToast';
import { useAuthStore } from '@/store/useAuthStore';
import { useDialogStore } from '@/store/useDialogStore';
import { usePolzzakStore } from '@/store/usePolzzakStroe';

function AddNEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditPage = Boolean(id);
  const isAddPage = !isEditPage;
  const [editRegion, setEditRegion] = useState<string[] | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { isOpen, openModal, closeModal } = useDialogStore();
  const {
    name,
    thumbnail,
    dateRange,
    region,
    imageUrl,
    setName,
    setDateRange,
    setRegion,
    setThumbnail,
    setFileName,
    setImageUrl,
    reset,
  } = usePolzzakStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const getUserId = useAuthStore((state) => state.user);
  const userId = getUserId?.id;
  const showToast = useToast();

  /* 편집 정보 가져오기 */
  const getEditInfo = async () => {
    const { data, error } = await supabase
      .from('ex_polzzak')
      .select('*')
      .eq('id', id);

    if (error) {
      showToast(
        '편집할 데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
        'bottom-[64px]',
        5000,
      );
      return;
    }

    const getEditRegion = async () => {
      const { data, error } = await supabase
        .from('ex_polzzak_region')
        .select('region')
        .eq('polzzak_id', id);

      if (error) {
        showToast(
          '편집할 데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
          'bottom-[64px]',
          5000,
        );
        return;
      } else if (!data || data.length === 0) {
        return;
      } else {
        const regionData = data.map((i) => i.region);
        setEditRegion(regionData);
      }
    };

    setName(data[0]?.name ?? null);
    setDateRange({ from: data[0].startDate, to: data[0]?.endDate ?? null });
    setThumbnail(data[0]?.thumbnail ?? null);
    getEditRegion();
  };

  useEffect(() => {
    reset();

    if (isAddPage) return;
    getEditInfo();
  }, []);

  /* 날짜 선택 */
  const handleCalender = () => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  };

  const calenderBtn = [
    {
      text: dateRange?.from
        ? dateRange?.to
          ? `${format(dateRange.from, 'yyyy-MM-dd(eee)', { locale: ko })} ~ ${format(dateRange.to, 'yyyy-MM-dd(eee)', { locale: ko })}`
          : `${format(dateRange.from, 'yyyy-MM-dd(eee)', { locale: ko })}`
        : '폴짝 타이밍을 선택해 주세요.',

      onClick: () => {
        closeModal();
      },
    },
    {
      text: '초기화',
      onClick: () => {
        setDateRange(undefined);
      },
    },
  ];

  /* 파일 선택 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setFileName(file?.name);
  };

  const handleCropDone = (blob: Blob) => {
    const previewUrl = URL.createObjectURL(blob);
    setThumbnail(previewUrl);
    setShowCropper(false);
  };

  /* 추가하기 */
  const errToast = () => {
    showToast(
      '폴짝을 추가하지 못했어요. 잠시 후 다시 시도해 주세요.',
      'bottom-[64px]',
      5000,
    );
  };

  const saveAddPolzzak = async () => {
    setIsSaving(true);
    /* 폴짝 이름 저장 */
    const { data, error } = await supabase
      .from('ex_polzzak')
      .insert([
        {
          user_id: userId,
          name: name || null,
          startDate:
            dateRange?.from &&
            format(dateRange.from, 'yyyy-MM-dd', { locale: ko }),
          endDate: dateRange?.to
            ? format(dateRange.to, 'yyyy-MM-dd', { locale: ko })
            : null,
          thumbnail: thumbnail || null,
        },
      ])
      .select();

    if (error) {
      errToast();
      throw error;
    }

    if (!data || data.length === 0) {
      errToast();
      throw error;
    }

    const polzzakId = data[0].id;
    try {
      /* 폴짝 날짜 저장 */
      // 날짜 single
      if (dateRange?.from) {
        const { error: oneScheduleErr } = await supabase
          .from('ex_polzzak_schedule')
          .insert([
            {
              polzzak_id: polzzakId,
              date: format(dateRange.from, 'yyyy-MM-dd', { locale: ko }),
            },
          ]);

        if (oneScheduleErr) {
          errToast();
          throw oneScheduleErr;
        }

        // 날짜 range
        if (dateRange?.to) {
          const getDateRangeArray = (start: Date, end: Date) => {
            const result = [];
            const current = new Date(start);
            while (current <= end) {
              result.push(new Date(current));
              current.setDate(current.getDate() + 1);
            }
            return result;
          };

          const dateList = getDateRangeArray(
            new Date(dateRange.from),
            new Date(dateRange.to),
          );

          const { error: scheduleErr } = await supabase
            .from('ex_polzzak_schedule')
            .insert(
              dateList.map((date) => ({
                polzzak_id: polzzakId,
                date: format(date, 'yyyy-MM-dd', { locale: ko }),
              })),
            );

          if (scheduleErr) {
            errToast();
            throw scheduleErr;
          }
        }
      }

      /* 폴짝 지역 저장 */
      if (region) {
        const { error: regionErr } = await supabase
          .from('ex_polzzak_region')
          .insert(
            region.map((item) => ({
              polzzak_id: polzzakId,
              region: item,
            })),
          );

        if (regionErr) {
          errToast();
          throw regionErr;
        }
      }

      navigate(`/polzzak/${polzzakId}`, { replace: true });
    } catch (err) {
      errToast();
      console.error('데이터 저장 실패 : ', err);
      if (polzzakId) {
        await supabase.from('ex_polzzak').delete().eq('id', polzzakId);
      }
    } finally {
      setIsSaving(false);
      reset();
    }
  };

  return (
    <section className="flex flex-col justify-between gap-10">
      <h1 className="sr-only">폴짝 추가하기</h1>
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <Input
            label="폴짝 이름"
            type="text"
            placeholder="폴짝 이름을 입력해 주세요."
            value={name ?? ''}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
          />
        </div>
        <div>
          <Input
            label="폴짝 날짜"
            type="button"
            value={
              dateRange?.from
                ? dateRange?.to
                  ? `${format(dateRange.from, 'yyyy-MM-dd', { locale: ko })} ~ ${format(dateRange.to, 'yyyy-MM-dd', { locale: ko })}`
                  : `${format(dateRange.from, 'yyyy-MM-dd', { locale: ko })}`
                : '폴짝 타이밍을 선택해 주세요.'
            }
            onClick={handleCalender}
            className={dateRange?.from && 'text-black'}
          >
            <Button variant={'tertiary'} size="md" onClick={handleCalender}>
              <Icon id="calendar" className="text-gray05" />
            </Button>
          </Input>
          {!dateRange?.from && (
            <Validation status={false} message="필수 입력 항목입니다." />
          )}
        </div>
        <div>
          <Chip
            mode="region"
            label="지역 선택"
            subLabel="다중 선택 가능합니다."
            type="multiple"
            onClick={(selectChip) => {
              setRegion((prev) => {
                if (!prev) return [selectChip.name];

                const isAlreadySelected = prev.includes(selectChip.name);
                return isAlreadySelected
                  ? prev.filter((chip) => chip !== selectChip.name)
                  : [...prev, selectChip.name];
              });
            }}
            // selectedValues={editRegion}
          />
        </div>
        <div>
          <Input
            label="폴짝 사진"
            type="file"
            placeholder="폴짝 사진을 등록해 주세요."
            onClick={() => setShowCropper(true)}
            onChange={handleFileChange}
            ref={inputRef}
          >
            <Button
              variant={'tertiary'}
              size="md"
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              <Icon id="image" className="text-gray05" />
            </Button>
          </Input>
        </div>

        {thumbnail && (
          <figure>
            <figcaption className="fs-14 m-1 px-1">
              폴짝 사진 미리보기
            </figcaption>
            <div className="relative w-1/2">
              <img
                src={thumbnail}
                alt="선택한 폴짝 사진 미리보기"
                className="rounded-lg border drop-shadow-md"
              />
              <Button
                className="absolute top-2 right-2 h-6 w-6"
                variant={'float'}
                size={'md'}
                onClick={() => {
                  setThumbnail(null);
                  setFileName(null);
                  setImageUrl(null);
                }}
              >
                <Icon id="close" />
              </Button>
            </div>
          </figure>
        )}
      </div>
      <Button disabled={!dateRange?.from} onClick={saveAddPolzzak}>
        {isAddPage ? '폴짝 추가하기' : '폴짝 저장하기'}
      </Button>
      {isOpen && (
        <SlideUpDialog
          header="폴짝 날짜 선택"
          button={calenderBtn}
          buttonDirection="col"
        >
          <CalendarCustom
            selected={dateRange ?? undefined}
            onSelect={setDateRange}
          />
        </SlideUpDialog>
      )}
      {showCropper && imageUrl && (
        <ImageCropper imageUrl={imageUrl} onCropDone={handleCropDone} />
      )}
      {isSaving && <Loader text="폴짝 저장 중..." />}
    </section>
  );
}

export default AddNEdit;
