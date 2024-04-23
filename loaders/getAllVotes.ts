interface Result {
  total: number;
}

const loader = async (): Promise<Result | null> => {
  const response = await fetch("https://camp-api.deco.cx/events", {
    method: "GET",
    headers: {
      "x-api-key": "pandeirocamp",
    },
  });

  if (response.ok) {
    return response.json();
  }

  return null;
};

export default loader;
  