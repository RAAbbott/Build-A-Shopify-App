import { useState } from "react";
import { Card, TextContainer } from "@shopify/polaris";
import { Toast, useNavigate } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";

export function ProductsCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handlePopulate = async () => {
    setIsLoading(true);
    const response = await fetch("/api/products/create");

    if (response.ok) {
      await refetchProductCount();
      setToastProps({ content: "5 products created!" });
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating products",
        error: true,
      });
    }
  };

  return (
    <>
      {toastMarkup}
      <Card
        title="Product Counter"
        sectioned
        primaryFooterAction={{
          content: "Populate 5 Products",
          onAction: handlePopulate,
          loading: isLoading,
        }}
        secondaryFooterActions={[
          {
            content: "View All Products",
            onAction: () => navigate({ name: "Product" }, { target: "new" }),
          },
        ]}
      >
        <TextContainer spacing="loose">
          <p>Use this nifty tool to create and update products</p>
        </TextContainer>
      </Card>
    </>
  );
}
