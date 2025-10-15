
import { columns } from "./columns";
import { getServices } from "./data";
import ServicesTable from "./table";

const ServicesPage = async () => {
  const data = await getServices();

  return <ServicesTable columns={columns} data={data!} />;
};

export default ServicesPage;
