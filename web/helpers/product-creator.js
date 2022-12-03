import { Shopify } from "@shopify/shopify-api";

const ADJECTIVES = [
  "autumn",
  "hidden",
  "bitter",
  "misty",
  "silent",
  "empty",
  "dry",
  "dark",
  "summer",
  "icy",
  "delicate",
  "quiet",
  "white",
  "cool",
  "spring",
  "winter",
  "patient",
  "twilight",
  "dawn",
  "crimson",
  "wispy",
  "weathered",
  "blue",
  "billowing",
  "broken",
  "cold",
  "damp",
  "falling",
  "frosty",
  "green",
  "long",
];

const NOUNS = [
  "waterfall",
  "river",
  "breeze",
  "moon",
  "rain",
  "wind",
  "sea",
  "morning",
  "snow",
  "lake",
  "sunset",
  "pine",
  "shadow",
  "leaf",
  "dawn",
  "glitter",
  "forest",
  "hill",
  "cloud",
  "meadow",
  "sun",
  "glade",
  "bird",
  "brook",
  "butterfly",
  "bush",
  "dew",
  "dust",
  "field",
  "fire",
  "flower",
];

const IMAGES = [
  "https://res.cloudinary.com/dci7ukl75/image/upload/v1668552461/BYOA/709618-0320_e20ckp.jpg",
  "https://res.cloudinary.com/dci7ukl75/image/upload/v1668552412/BYOA/22-02-2021_MO_112247-NAVY_1_1_cseojc.webp",
  "https://res.cloudinary.com/dci7ukl75/image/upload/v1668552374/BYOA/ipad-mini-select-202109_FMT_WHH_cb84pl.jpg",
  "https://res.cloudinary.com/dci7ukl75/image/upload/v1668552374/BYOA/MPLD3_VW_34FR_watch-45-alum-starlight-nc-8s_VW_34FR_WF_CO_dgkcic.jpg",
  "https://res.cloudinary.com/dci7ukl75/image/upload/v1668552374/BYOA/MQDY3ref_VW_34FR_watch-49-titanium-ultra_VW_34FR_WF_CO_watch-face-49-alpine-ultra_VW_34FR_WF_CO_il7bdy.jpg",
  "https://res.cloudinary.com/dci7ukl75/image/upload/v1668552374/BYOA/buoy_wear_floating_hat-10_rqeipt.jpg",
  "https://res.cloudinary.com/dci7ukl75/image/upload/v1668552374/BYOA/drinkcupsocks_product2_1_1_grande_autj8d.webp",
  "https://res.cloudinary.com/dci7ukl75/image/upload/v1668552374/BYOA/20211202-141138_FGS169_Gloves_Hawk_Black_front_iri8qc.webp",
];

export const DEFAULT_PRODUCTS_COUNT = 5;
const CREATE_PRODUCTS_MUTATION = `
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
    }
  }
`;

export default async function productCreator(
  session,
  count = DEFAULT_PRODUCTS_COUNT
) {
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  try {
    for (let i = 0; i < count; i++) {
      await client.query({
        data: {
          query: CREATE_PRODUCTS_MUTATION,
          variables: {
            input: {
              title: `${randomTitle()}`,
              variants: [{ price: randomPrice() }],
              images: [{src: randomImage()}],
              descriptionHtml: 'This is a default description'
            },
          },
        },
      });
    }
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

function randomTitle() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adjective} ${noun}`;
}

function randomPrice() {
  return Math.round((Math.random() * 10 + Number.EPSILON) * 100) / 100;
}

function randomImage() {
  return IMAGES[Math.floor(Math.random() * IMAGES.length)];
}
