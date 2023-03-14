import { EmptyState, Layout, Spinner, Card } from "@shopify/polaris";
import { ProductCard } from "./ProductCard";

export const ProductList = ({ data, isLoading, isRefetching }) => {
  if (isLoading || isRefetching) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout>
      {data?.products.length ? (
        data.products.map((product) => (
          <Layout.Section key={product.id}>
            <ProductCard {...product}></ProductCard>
          </Layout.Section>
        ))
      ) : (
        <Layout.Section>
          <Card>
            <EmptyState
              heading="No Products Found"
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>Add products using the card above</p>
            </EmptyState>
          </Card>
        </Layout.Section>
      )}
    </Layout>
  );
};
