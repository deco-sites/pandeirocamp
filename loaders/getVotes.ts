export interface Result {
  product: number;
}

interface Props {
  productId: string;
}

const loader = async (props: Props): Promise<Result> => {
  const response = await fetch(`https://camp-api.deco.cx/event/${props.productId}`,
    {
      method: "GET",
      headers: {
        "x-api-key": "pandeirocamp",
      },
    },
  ).then((response) => response.json());

  return response;
};

export default loader;
  