import { Card, FormLayout, Stack, TextField } from "@shopify/polaris";

export const ProductCard = () => {
  return (
    <Card
      sectioned
      primaryFooterAction={{
        content: "Update Product",
        onAction: () => console.log("update product"),
      }}
      secondaryFooterActions={[
        {
          content: "View in Admin",
          onAction: () => console.log("view in admin"),
        },
      ]}
    >
      <Stack spacing="extraLoose">
        <Stack.Item>
          <img src="../assets/home-trophy.png" alt="" width="250" />
        </Stack.Item>
        <Stack.Item fill>
          <FormLayout>
            <TextField label="Product Title"></TextField>
            <TextField multiline={4} label="Product Description"></TextField>
          </FormLayout>
        </Stack.Item>
      </Stack>
    </Card>
  );
};
