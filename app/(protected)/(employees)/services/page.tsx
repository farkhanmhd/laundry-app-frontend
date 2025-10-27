import { columns } from "./components/columns";
import ServicesTable from "./components/table";
import { getServices } from "./data";

const ServicesPage = async () => {
  const data = await getServices();

  return <ServicesTable columns={columns} data={data!} />;
};

export default ServicesPage;
