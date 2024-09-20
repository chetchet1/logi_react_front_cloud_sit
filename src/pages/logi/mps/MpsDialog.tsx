//2023-10-31(화) Hoyeon
//필요없는 코드 정리 및 데이터 연결

import MyGrid from 'pages/utils/Mygrid';
import mpsListColumn from './mpsListColumn';
import MainCard from 'ui-component/cards/MainCard';

type props = {
  mpsList: any;
  calendarDate: any;
};

const MpsDialog = ({ mpsList, calendarDate }: props) => {
  console.log('setMpsList2 = ' + JSON.stringify(mpsList));
  console.log('calendarDate = ' + calendarDate.startDate);
  console.log('calendarDate = ' + calendarDate.endDate);
  return (
    <>
      <MainCard title="주생산계획(MPS)">
        <MyGrid column={mpsListColumn} list={mpsList} />
      </MainCard>
    </>
  );
};

export default MpsDialog;
