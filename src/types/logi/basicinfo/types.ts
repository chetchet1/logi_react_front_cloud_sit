export interface WorkPlaceInfoEntity {
  businessLicenseNumber: string;
  companyCode: string;
  corporationLicenseNumber: string;
  isMainOffice: string;
  workplaceBasicAddress: string;
  workplaceBusinessConditions: string;
  workplaceBusinessItems: string;
  workplaceCeoName: string;
  workplaceCloseDate: string;
  workplaceCode: string;
  workplaceDetailAddress: string;
  workplaceEstablishDate: string;
  workplaceFaxNumber: string;
  workplaceName: string;
  workplaceOpenDate: string;
  workplaceTelNumber: string;
  workplaceZipCode: string;
}

export interface ColumnProps {
  id: string;
  label: string;
  minWidth: number;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  format?: (value: Date | number) => string | boolean;
  hide?: boolean;
  editable?: boolean; // 수정: editable 속성의 타입을 boolean으로 변경
}
