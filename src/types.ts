export type PagesResponse = {
  url: string;
  totalCount: number;
  totalVisitorCount: number;
  bounceCount: number;
  startsWithCount: number;
  endsWithCount: number;
  avgScrollPercentage: number;
  totalPageviewCount: number;
};

export type TransformedPagesData = {
  url: string;
  scroll: string;
  bounce: string;
  enters: number;
  exits: number;
  pageViews: number;
  visitors: number;
};