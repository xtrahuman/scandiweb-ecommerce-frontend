import {gql} from "@apollo/client";

export const GETPRODUCT = 'CATEGORY/CURRENTPRODUCT/GET'

export const fetchProduct = (payload) => (
    {
        type: GETPRODUCT,
        payload,
    }
)

export const PRODUCT_QUERY = (payload) => gql`
query ProductQuery{
    product(id:"${payload}"){
        id,
        name,
        inStock,
        gallery,
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
`

