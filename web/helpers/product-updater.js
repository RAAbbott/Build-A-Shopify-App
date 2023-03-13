import { Shopify } from "@shopify/shopify-api";

const UPDATE_PRODUCT_MUTATION = `
mutation updateProduct($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        descriptionHtml
        title
        variants (first: 10) {
          edges {
            node {
              id
              price
            }
          }
        }
      }
    }
  }
`;

export default async function productUpdater(
  session,
  { id, description, title, variants }
) {
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  try {
    await client.query({
      data: {
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          input: {
            id,
            descriptionHtml: description,
            title,
            variants,
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Shopify.Errors.GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
