export type Contract = {
    contractDate: string;
    contractDetailTOList: ContractDetail[];
    contractNo: string;
    contractRequester: string;
    contractType: string;
    contractTypeName: string;
    customerCode: string;
    customerName: string;
    deliveryCompletionStatus: string | null;
    description: string | null;
    empNameInCharge: string;
    estimateDate: string;
    estimateNo: string;
    personCodeInCharge: string;
    status: string;
};

export type ContractDetail = {
    contractDetailNo: string;
    contractNo: string;
    deliveryCompletionStatus: string | null;
    description: string | null;
    dueDateOfContract: string;
    estimateAmount: string;
    itemCode: string;
    itemName: string;
    mrpGatheringNo: string | null;
    operationCompletedStatus: string;
    processingStatus: string;
    productionRequirement: string;
    result: string | null;
    status: string;
    stockAmountUse: string;
    sumPriceOfContract: string;
    unitOfContract: string;
    unitPriceOfContract: string;
  };