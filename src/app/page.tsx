import HTMLTable from '@/components/HTMLTable';
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
  return <HTMLTable pages={transformedData} />;
}
