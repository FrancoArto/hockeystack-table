import { PagesResponse, TransformedPagesData } from '@/types';

const transformPagesResponse = (
  data: PagesResponse[]
): TransformedPagesData[] =>
  data.map((page) => {
    const {
      url,
      totalCount,
      totalVisitorCount,
      bounceCount,
      startsWithCount,
      endsWithCount,
      avgScrollPercentage,
      totalPageviewCount,
    } = page;

    const bounce =
      isNaN(totalCount) || totalCount < 1
        ? 'Unavailable'
        : `${(bounceCount * 100) / totalCount}%`;

    return {
      url,
      scroll: `${avgScrollPercentage}%`,
      bounce,
      enters: startsWithCount,
      exits: endsWithCount,
      pageViews: totalPageviewCount,
      visitors: totalVisitorCount,
    };
  });

export default transformPagesResponse;