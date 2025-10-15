import type { SearchQuery } from "@/lib/search-params";
import { columns } from "./columns";
import { getMembers } from "./data";
import MembersTable from "./table";

type Props = {
  searchParams: Promise<{
    rows: string;
    page: string;
    search: string;
  }>;
};

const MemberPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const query: SearchQuery = {
    rows: Number(searchParams.rows) || 50,
    search: searchParams.search || "",
    page: Number(searchParams.page) || 1,
  };

  const data = await getMembers(query);

  return (
    <MembersTable
      columns={columns}
      data={data!.members}
      total={data!.total as number}
    />
  );
};

export default MemberPage;
