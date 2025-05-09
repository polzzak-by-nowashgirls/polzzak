export type BaseDetail = {
  title: string;
  image: string;
  addr1: string;
  addr2?: string;
};

export type FoodDetail = BaseDetail & {
  contentTypeId: 39; // 음식점
  chkcreditcardfood?: string;
  discountinfofood?: string;
  firstmenu?: string;
  infocenterfood?: string;
  kidsfacility?: string;
  opendatefood?: string;
  opentimefood?: string;
  packing?: string;
  parkingfood?: string;
  reservationfood?: string;
  restdatefood?: string;
  scalefood?: string;
  seat?: string;
  smoking?: string;
  treatmenu?: string;
  lcnsno?: string;
};

export type FestivalDetail = BaseDetail & {
  contentTypeId: 15; // 축제행사공연
  discountinfofestival?: string;
  eventenddate?: string;
  playtime?: string;
  placeinfo?: string;
  eventhomepage?: string;
  eventplace?: string;
  eventstartdate?: string;
  festivalgrade?: string;
  program?: string;
  spendtimefestival?: string;
  sponsor1?: string;
  sponsor1tel?: string;
  chkpetculture?: string;
  discountinfo?: string;
  agelimit?: string;
  bookingplace?: string;
  sponsor2?: string;
  sponsor2tel?: string;
  subevent?: string;
  usetimefestival?: string;
};

export type TourDetail = BaseDetail & {
  contentTypeId: 12; // 관광지
  opendate?: string;
  parking?: string;
  restdate?: string;
  accomcount?: string;
  chkbabycarriage?: string;
  chkcreditcard?: string;
  chkpet?: string;
  expagerange?: string;
  expguide?: string;
  heritage1?: string;
  heritage2?: string;
  heritage3?: string;
  infocenter?: string;
  useseason?: string;
  usetime?: string;
};

export type LeportsDetail = BaseDetail & {
  contentTypeId: 28; // 레포츠
  scaleleports?: string;
  usefeeleports?: string;
  usetimeleports?: string;
  parkingleports?: string;
  reservation?: string;
  restdateleports?: string;
  accomcountleports?: string;
  chkbabycarriageleports?: string;
  chkcreditcardleports?: string;
  chkpetleports?: string;
  expagerangeleports?: string;
  infocenterleports?: string;
  openperiod?: string;
  parkingfeeleports?: string;
};

export type ShoppingDetail = BaseDetail & {
  contentTypeId: 38; // 쇼핑
  chkbabycarriageshopping?: string;
  chkcreditcardshopping?: string;
  chkpetshopping?: string;
  culturecenter?: string;
  fairday?: string;
  infocentershopping?: string;
  opendateshopping?: string;
  opentime?: string;
  parkingshopping?: string;
  restdateshopping?: string;
  restroom?: string;
  saleitem?: string;
  saleitemcost?: string;
  scaleshopping?: string;
  shopguide?: string;
};

export type HotelDetail = BaseDetail & {
  contentTypeId: 32; // 숙박
  roomcount?: string;
  reservationlodging?: string;
  reservationurl?: string;
  roomtype?: string;
  scalelodging?: string;
  subfacility?: string;
  barbecue?: string;
  beauty?: string;
  beverage?: string;
  bicycle?: string;
  campfire?: string;
  fitness?: string;
  parkinglodging?: string;
  pickup?: string;
  publicbath?: string;
  foodplace?: string;
  goodstay?: string;
  hanok?: string;
  infocenterlodging?: string;
  karaoke?: string;
  publicpc?: string;
  sauna?: string;
  seminar?: string;
  sports?: string;
  refundregulation?: string;
};

export type CulturalDetail = BaseDetail & {
  contentTypeId: 14; // 문화시설
  roomcount?: string;
  reservationlodging?: string;
  reservationurl?: string;
  roomtype?: string;
  scalelodging?: string;
  subfacility?: string;
  barbecue?: string;
  beauty?: string;
  beverage?: string;
  bicycle?: string;
  campfire?: string;
  fitness?: string;
  parkinglodging?: string;
  pickup?: string;
  publicbath?: string;
  foodplace?: string;
  goodstay?: string;
  hanok?: string;
  infocenterlodging?: string;
  karaoke?: string;
  publicpc?: string;
  sauna?: string;
  seminar?: string;
  sports?: string;
  refundregulation?: string;
};

export type CourseDetail = BaseDetail & {
  contentTypeId: 25; // 여행코스
  taketime?: string;
  theme?: string;
  distance?: string;
  infocentertourcourse?: string;
  schedule?: string;
};
