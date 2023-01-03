import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { ProductCard, ProductsCard } from "../components";

export default function HomePage() {
  return (
    <Page>
      <TitleBar title="App name" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <ProductsCard />
        </Layout.Section>
        <Layout.Section>
          <ProductCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
