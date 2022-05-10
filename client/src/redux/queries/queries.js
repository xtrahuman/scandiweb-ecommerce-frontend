import { gql } from '@apollo/client';

export const PRODUCT_QUERY = (id) => gql`
query ProductQuery{
    product(id:"${id}"){
        id,
        name,
        inStock,
        gallery,
        description,
        category
        prices{
         currency{
          symbol,
          label
        },
          amount,
        }
        attributes{
          id,
          name,
          type,
          items{
            displayValue,
            id,
            value
          }
          }
      }
}
`;

export const ALL_QUERY = gql`
query AllQuery{
  categories{
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

currencies{
  label,
  symbol
}
}
`;

export const CATEGORY_QUERY = (category) => gql`
query CategoryQuery{
  category(input:{title:"${category}"} ){
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
     },
     attributes{
      id,
      name,
      type,
      items{
        displayValue,
        id,
        value
      }
      }
  }
}
}
`;
