import {
  Button,
  Card,
  Collapsible,
  FormLayout,
  Stack,
  TextField,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useAuthenticatedFetch } from "../hooks";
import { Variants } from "./Variants";
import { useNavigate, Toast } from "@shopify/app-bridge-react";

export const ProductCard = (props) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [showVariants, setShowVariants] = useState(false);
  const [variants, setVariants] = useState(props.variants);
  const [showToast, setShowToast] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();

  const toggleToast = useCallback(() => setShowToast((active) => !active), []);

  const toastMarkup = showToast ? (
    <Toast content="Product Updated" onDismiss={toggleToast} />
  ) : null;

  const onUpdate = async () => {
    setIsUpdating(true);

    const updatedProduct = {
      id: props.id,
      title,
      description,
      variants,
    };

    const response = await fetch("/api/products/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (response.ok) {
      toggleToast();
    }

    setIsUpdating(false);
  };

  const updateVariant = (id, price) => {
    setVariants((prev) => {
      const updatedVariants = prev.map((variant) => {
        if (id === variant.id) {
          return { ...variant, price };
        }

        return variant;
      });

      return updatedVariants;
    });
  };

  return (
    <>
      <Card
        sectioned
        primaryFooterAction={{
          content: isUpdating ? "Updating..." : "Update Product",
          onAction: onUpdate,
          disabled: isUpdating,
        }}
        secondaryFooterActions={[
          {
            content: "View in Admin",
            onAction: () =>
              navigate(
                { name: "Product", resource: { id: props.legacyId } },
                { target: "new" }
              ),
          },
        ]}
      >
        <Stack spacing="extraLoose">
          <Stack.Item>
            <img src={props.image} alt="" width="250" />
          </Stack.Item>
          <Stack.Item fill>
            <FormLayout>
              <TextField
                label="Product Title"
                value={title}
                onChange={setTitle}
                disabled={isUpdating}
              ></TextField>
              <TextField
                multiline={4}
                label="Product Description"
                value={description}
                onChange={setDescription}
                disabled={isUpdating}
              ></TextField>

              <Button onClick={() => setShowVariants((prev) => !prev)}>
                Show Variants
              </Button>

              <Collapsible open={showVariants}>
                <Variants
                  variants={variants}
                  updateVariant={updateVariant}
                  isUpdating={isUpdating}
                />
              </Collapsible>
            </FormLayout>
          </Stack.Item>
        </Stack>
      </Card>

      {toastMarkup}
    </>
  );
};
