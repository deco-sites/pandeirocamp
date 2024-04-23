interface Props {
  productId: string;
}

interface Result {
  product: number;
  total: number;
}

const loader = async (props: Props): Promise<Result | null> => {
  const response = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "x-api-key": "pandeirocamp",
    },
    body: JSON.stringify(props),
  });

  if (response.ok) {
    return response.json();
  }

  return null;
};

export default loader;
