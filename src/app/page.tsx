import BasicTable from '@/components/BasicTable';
import MUITable from '@/components/MUITable';
import { PagesResponse } from '@/types';
import transformPagesResponse from '@/utils/transformPagesResponse';

export default async function Home() {
  // TODO: Remove hardcoded URL
  const response = await fetch('http://localhost:3000/api/pages');
  const data: PagesResponse[] = await response.json();

  if (!data || data.length === 0)
    return (
      <p className="mt-10 text-xl">No data was returned from the server</p>
    );

  const transformedData = transformPagesResponse(data);
  return (
    <div>
      <div className="my-10">
        <h2 className="text-2xl text-center mb-4">Basic Table</h2>
        <BasicTable pages={transformedData} />
      </div>
      <div className="my-10">
        <h2 className="text-2xl text-center mb-4">MUI Data Grid Table</h2>
        <MUITable pages={transformedData} />
      </div>
    </div>
  );
}
