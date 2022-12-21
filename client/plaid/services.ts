const createLinkToken = async () => {
  const linkTokenCreateRequest: LinkTokenCreateRequest = {
    user: {
      client_user_id: user!.uid,
    },
    client_name: "Perfin",
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: "en",
  };
  await axios
    .post<LinkTokenCreateResponse>("/api/plaid/link-tokens", { data: linkTokenCreateRequest })
    .then(({ data: { link_token } }) => {
      setLinkToken(link_token);
    })
    .catch((error) => {
      console.log(error);
    });
};
