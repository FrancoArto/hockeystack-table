import HTMLTable from '@/components/HTMLTable';
import LibraryTable from '@/components/LibraryTable';
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
        <h2 className="text-2xl text-center mb-4">HTML Table</h2>
        <HTMLTable pages={transformedData} />
      </div>
      <div className="my-10">
        <h2 className="text-2xl text-center mb-4">Library table</h2>
        <LibraryTable pages={transformedData} />
      </div>
    </div>
  );
}
