import ProductTable from "./components/TaskTable/TaskTable";
import TaskStatusChart from "./components/TaskStatusChart";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center mx-6">
        <ProductTable />
        <TaskStatusChart />
      </div>
    </>
  );
}

export default App;
