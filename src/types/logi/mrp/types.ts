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

export interface Mrp {
  mpsNo: string;
  bomNo: string;
  itemClassification: string;
  itemCode: string;
  orderDate: string;
  requiredDate: string;
  planAmount: string;
  totalLossRate: string;
  caculatedAmount: string;
  requiredAmount: number;
  unitOfMrp: string;
}

export interface MrpTO {
  mrpNo: string;
  mpsNo: string;
  mrpGatheringNo: string;
  itemClassification: string;
  itemCode: string;
  itemName: string;
  unitOfMrp: string;
  requiredAmount: number;
  orderDate: string;
  requiredDate: string;
  mrpGatheringStatus: string;
}

export interface MrpGatheringTO {
  mrpGatheringNo: string;
  orderOrProductionStatus: string;
  itemCode: string;
  itemName: string;
  unitOfMrpGathering: string;
  claimDate: string;
  dueDate: string;
  necessaryAmount: number;
  mrpTOList: MrpTO[];
  mrpGatheringSeq: number;
}

export interface MrpInsertInfoTO {
  firstMrpNo: string;
  lastMrpNo: string;
  length: string;
}

export interface OpenMrpTO {
  mpsNo: string;
  bomNo: string;
  itemClassification: string;
  itemCode: string;
  itemName: string;
  orderDate: string;
  requiredDate: string;
  planAmount: string;
  totalLossRate: string;
  caculatedAmount: string;
  requiredAmount: number;
  unitOfMrp: string;
}

export interface ProductionWorkInstructionTO {
  workInstructionAmount: number;
  workInstructionNo: string;
  description: string;
  itemCode: string;
  productionStatus: string;
  instructionDate: string;
  mrpGatheringNo: string;
  itemName: string;
  unitOfWorkInstruction: string;
}

export interface SalesPlanInMpsAvailableTO {
  salesPlanNo: string;
  planClassification: string;
  itemCode: string;
  itemNam: string;
  unitOfSales: string;
  salesPlanDate: string;
  mpsPlanDate: string;
  scheduledEndDate: string;
  dueDateOfSales: string;
  salesAmount: string;
  unitPriceOfSales: number;
  sumPriceOfSales: number;
  mpsApplyStatus: string;
  description: string;
}

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
