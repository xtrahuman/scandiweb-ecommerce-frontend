export const GETCATEGORY = 'CATEGORIES/CURRENTCATEGORY/GET';

export const fetchCategory = (payload) => (
  {
    type: GETCATEGORY,
    payload,
  }
);
