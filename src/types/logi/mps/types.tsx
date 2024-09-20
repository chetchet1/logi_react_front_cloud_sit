interface ColumnProps {
  id: string;
  label: string;
  minWidth: number;
  data?: any;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  format?: (value: Date | number) => string | boolean;
  hide?: boolean;
  editable?: true;
}

export default ColumnProps;

export interface MpsTO {
  mpsNo: string;
  mpsPlanClassification: string;
  contractDetailNo: string;
  salesPlanNo: string;
  itemCode: string;
  itemName: string;
  unitOfMps: string;
  mpsPlanDate: string;
  mpsPlanAmount: string;
  dueDateOfMps: string;
  scheduledEndDate: string;
  mrpApplyStatus: string;
  description: string;
}

export interface SalesPlanInMpsAvailableTO {
  salesPlanNo: string;
  planClassification: string;
  itemCode: string;
  itemName: string;
  unitOfSales: string;
  salesPlanDate: string;
  mpsPlanDate: string;
  scheduledEndDate: string;
  dueDateOfSales: string;
  salesAmount: string;
  unitPriceOfSales: string;
  sumPriceOfSales: string;
  mrpApplyStatus: string;
  description: string;
}

export interface ContractDetailInMpsAvailableTO {
  contractNo: string;
  contractType: string;
  contractDate: string;
  customerCode: string;
  contractDetailNo: string;
  itemCode: string;
  itemName: string;
  unitOfContract: string;
  estimateAmount: string;
  stockAmountUse: string;
  productionRequirement: string;
  dueDateOfContract: string;
  description: string;
  planClassification: string;
  mpsPlanDate: string;
  scheduledEndDate: string;
}
