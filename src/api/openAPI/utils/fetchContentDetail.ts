import { client } from '@/api/openAPI/client';

// 관광지, 문화시설, 축제공연행사, 레포츠, 숙박, 쇼핑, 음식점
// [
//   '1607440', // 관광지
//   '2834026', // 문화시설
//   '3422647', // 축제공연행사
//   '2790332', // 레포츠
//   '2465071', // 숙박
//   '2917296', // 쇼핑
//   '2758120', // 음식점
// ];

/* 📍 detail=true는 콘텐츠가 세부 페이지일 때 */
async function fetchContentDetail(
  contentId: string,
  contentTypeId: string,
  detail: boolean = false,
) {
  /* 🧩 detailCommon1과 detailIntro1 함께 호출 */
  const [commonRes, introRes] = await Promise.all([
    client.get(`/detailCommon1`, {
      params: {
        contentId,
        contentTypeId,
        defaultYN: 'Y',
        firstImageYN: 'Y',
        areacodeYN: 'Y',
        catcodeYN: 'Y',
        addrinfoYN: 'Y',
        overviewYN: 'Y',
        pageNo: 1,
        numOfRows: 20,
      },
    }),
    client.get(`/detailIntro1`, {
      params: {
        pageNo: 1,
        numOfRows: 20,
        contentId,
        contentTypeId,
      },
    }),
  ]);

  const commonItem = commonRes.data.response.body.items.item[0];
  const introItem = introRes.data.response.body.items.item[0];

  /* 🔑 받아온 주소에서 "region: 서울, destrict: 용산구" 뽑아냄 */
  const [region, district] = commonItem.addr1.split(' ') ?? [];

  const baseDetail = {
    title: commonItem.title,
    image: commonItem.firstimage,
    addr1: commonItem.addr1,
    addr2: commonItem.addr2,
    tel: introItem.tel,
  };
  const baseCard = {
    title: commonItem.title,
    image: commonItem.firstimage,
    region: region,
    district: district,
  };

  switch (contentTypeId) {
    case '12':
      // 관광지
      return detail
        ? {
            ...baseDetail,
            expagerange: introItem.expagerange,
            expguide: introItem.expguide,
            infocenter: introItem.infocenter,
            opendate: introItem.opendate,
            parking: introItem.parking,
            restdate: introItem.restdate,
            useseason: introItem.useseason,
            usetime: introItem.usetime,
          }
        : {
            ...baseCard,
            usetime: introItem.usetime,
          };
    case '14':
      // 문화시설
      return detail
        ? {
            ...baseDetail,
            accomcountculture: introItem.accomcountculture,
            chkbabycarriageculture: introItem.chkbabycarriageculture,
            chkcreditcardculture: introItem.chkcreditcardculture,
            chkpetculture: introItem.chkpetculture,
            discountinfo: introItem.discountinfo,
            infocenterculture: introItem.infocenterculture,
            parkingculture: introItem.parkingculture,
            parkingfee: introItem.parkingfee,
            restdateculture: introItem.restdateculture,
            spendtime: introItem.spendtime,
            usefee: introItem.usefee,
            usetimeculture: introItem.usetimeculture,
          }
        : {
            ...baseCard,
            usetimeculture: introItem.usetimeculture,
          };
    case '15':
      // 축제공연행사
      return detail
        ? {
            ...baseDetail,
            eventstartdate: introItem.eventstartdate,
            eventenddate: introItem.eventenddate,
            overview: commonItem.overview,
            eventhomepage: commonItem.eventhomepage,
            eventplace: commonItem.eventplace,
            placeinfo: commonItem.placeinfo,
            playtime: commonItem.playtime,
            program: commonItem.program,
            subevent: commonItem.subevent,
            usetimefestival: commonItem.usetimefestival,
          }
        : {
            ...baseCard,
            eventstartdate: introItem.eventstartdate,
            eventenddate: introItem.eventenddate,
          };
    case '28':
      // 레포츠
      return detail
        ? {
            ...baseDetail,
            accomcountleports: introItem.accomcountleports,
            chkbabycarriageleports: introItem.chkbabycarriageleports,
            chkcreditcardleports: introItem.chkcreditcardleports,
            expagerangeleports: introItem.expagerangeleports,
            infocenterleports: introItem.infocenterleports,
            openperiod: introItem.openperiod,
            parkingfeeleports: introItem.parkingfeeleports,
            parkingleports: introItem.parkingleports,
            reservation: introItem.reservation,
            restdateleports: introItem.restdateleports,
            usetimeleports: introItem.usetimeleports,
          }
        : {
            ...baseCard,
            usetimeleports: introItem.usetimeleports,
          };
    case '32':
      // 숙박
      return detail
        ? {
            ...baseDetail,
            eventstartdate: introItem.eventstartdate,
            eventenddate: introItem.eventenddate,
            checkintime: introItem.checkintime,
            checkouttime: introItem.checkouttime,
            chkcooking: introItem.chkcooking,
            foodplace: introItem.foodplace,
            goodstay: introItem.goodstay,
            hanok: introItem.hanok,
            infocenterlodging: introItem.infocenterlodging,
            parkinglodging: introItem.parkinglodging,
            pickup: introItem.pickup,
            refundregulation: introItem.refundregulation,
            reservationlodging: introItem.reservationlodging,
            reservationurl: introItem.reservationurl,
            roomcount: introItem.roomcount,
            roomtype: introItem.roomtype,
            sauna: introItem.sauna,
            scalelodging: introItem.scalelodging,
            subfacility: introItem.subfacility,
            campfire: introItem.campfire,
          }
        : {
            ...baseCard,
            checkintime: introItem.checkintime,
            checkouttime: introItem.checkouttime,
          };
    case '38':
      // 쇼핑
      return detail
        ? {
            ...baseDetail,
            chkbabycarriageshopping: introItem.chkbabycarriageshopping,
            chkcreditcardshopping: introItem.chkcreditcardshopping,
            chkpetshopping: introItem.chkpetshopping,
            fairday: introItem.fairday,
            infocentershopping: introItem.infocentershopping,
            opendateshopping: introItem.opendateshopping,
            opentime: introItem.opentime,
            parkingshopping: introItem.parkingshopping,
            restdateshopping: introItem.restdateshopping,
            restroom: introItem.restroom,
            shopguide: introItem.shopguide,
          }
        : {
            ...baseCard,
            opentime: introItem.opentime,
          };
    case '39':
      // 음식점
      return detail
        ? {
            ...baseDetail,
            chkcreditcardfood: introItem.chkcreditcardfood,
            firstmenu: introItem.firstmenu,
            infocenterfood: introItem.infocenterfood,
            kidsfacility: introItem.kidsfacility,
            opentimefood: introItem.opentimefood,
            packing: introItem.packing,
            parkingfood: introItem.parkingfood,
            reservationfood: introItem.reservationfood,
            restdatefood: introItem.restdatefood,
            treatmenu: introItem.treatmenu,
          }
        : {
            ...baseCard,
            opentimefood: introItem.opentimefood,
          };
    default:
      return detail ? { ...baseDetail } : { ...baseCard };
  }
}

export { fetchContentDetail };
