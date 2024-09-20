export interface EstimateTO {
  contractStatus: string | null;
  customerCode: string;
  customerName: string;
  description: string | null;
  effectiveDate: string;
  estimateDate: string;
  estimateDetailTOList: EstimateDetail[];
  estimateNo: string;
  estimateRequester: string;
  personCodeInCharge: string;
  personNameCharge: string | null;
  status: string;
}

export interface EstimateDetail {
  status: string;
  unitOfEstimate: string;
  estimateNo: string;
  unitPriceOfEstimate: number;
  estimateDetailNo: string;
  // 이 외 필요한 속성들 추가
}
