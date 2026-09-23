import RoomList from '../../widgets/RoomList/RoomList';
import Filters from '../../widgets/Filters/Filters';

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Filters />
      <RoomList />
    </div>
  );
};

export default DashboardPage;
