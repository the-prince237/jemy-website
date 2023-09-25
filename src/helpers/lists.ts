export type loadMoreType = {
  pageInfo: any;
  fetchMore: any;
  variables?: any;
  fetchMoreProps?: any;
  column?: boolean;
};

export const onLoadMore = (
  pageInfo: any,
  fetchMore: any,
  variables?: any,
  fetchMoreProps?: any,
) => {
  if (pageInfo.hasNextPage) {
    fetchMore({
      variables: {
        cursor: pageInfo.endCursor,
        ...variables,
      },
      fetchMoreProps,
    });
  }
};
