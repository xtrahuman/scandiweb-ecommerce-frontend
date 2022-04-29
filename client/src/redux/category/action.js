import { gql } from '@apollo/client';

export const GETCATEGORY = 'CATEGORIES/CURRENTCATEGORY/GET';

export const fetchCategory = (payload) => (
  {
    type: GETCATEGORY,
    payload,
  }
);

export const CATEGORY_QUERY = (payload) => gql`
query CategoryQuery{
  category(input:{title:"${payload}"} ){
  name,
  products{
    id,
    name,
    inStock,
    gallery,
    prices{
      currency{
       symbol,
       label
     },
       amount
     }
  }
}
}
`;
