import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { DataGrid } from '@mui/x-data-grid';

function ContractModal({ isOpen, closeModal, rowData }) {
  const column = {
    columnDefs: [
      { headerName: '수주상세일련번호', field: 'contractDetailNo', hide: true },
      { headerName: '수주일련번호', field: 'contractNo' },
      { headerName: '품목코드', field: 'itemCode', hide: true },
      { headerName: '품목명', field: 'itemName' },
      { headerName: '단위', field: 'unitOfContract' },
      { headerName: '납기일', field: 'dueDateOfContract' },
      { headerName: '수주수량', field: 'estimateAmount' },
      { headerName: '재고사용량', field: 'stockAmountUse' },
      { headerName: '필요제작수량', field: 'productionRequirement' },
      {
        headerName: '단가',
        field: 'unitPriceOfContract'
      },
      {
        headerName: '합계액',
        field: 'sumPriceOfContract'
      },
      { headerName: '처리상태', field: 'processingStatus' },
      { headerName: '작업완료여부', field: 'operationCompletedStatus' },
      { headerName: '납품완료여부', field: 'deliveryCompletionStatus' },
      { headerName: '비고', field: 'description', hide: true },
      { headerName: '상태', field: 'status', hide: true },
      { headerName: '상태2', field: 'beforeStatus', hide: true }
    ]
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth="lg">
      <div style={{ width: '800px', height: '400px' }}>
        <DataGrid
          rows={rowData} // 수주 상세 정보 데이터
          getRowId={(row) => row.contractDetailNo}
          columns={column}
        />
      </div>
    </Dialog>
  );
}

export default ContractModal;
