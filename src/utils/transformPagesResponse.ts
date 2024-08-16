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

    const bounce = getBouncePercentage(bounceCount, totalCount);

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

const getBouncePercentage = (
  bounceCount: number,
  totalCount: number
): string => {
  if (isNaN(totalCount) || totalCount < 1) return 'Unavailable';
  const bouncePercentage = (bounceCount * 100) / totalCount;
  return `${bouncePercentage.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}%`;
};

export default transformPagesResponse;
