export interface NearItemType extends DetailCommonDataType {
  addr1: string;
  addr2?: string;
  mapx: string;
  mapy: string;
  firstimage?: string | null;
  tel?: string | null;
}

export interface DetailCommonDataType {
  addr1?: string;
  addr2?: string;
  areacode?: string;
  booktour?: string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
  contentid?: string;
  contenttypeid?: string;
  cpyrhtDivCd?: string;
  createdtime?: string;
  dist?: string;
  firstimage?: string | null;
  firstimage2?: string;
  mapx?: string;
  mapy?: string;
  mlevel?: string;
  modifiedtime?: string;
  sigungucode?: string;
  tel?: string | null;
  title?: string;
}
