import axios from "axios";
import { User } from "firebase/auth";
import { LinkTokenCreateRequest, LinkTokenCreateResponse } from "plaid";

const getUserIdToken = async (user: User) => {
  // const { user } = useContext(UserContext);
  if (user) {
    try {
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      return null;
    }
  }
  return null;
};

export const postLinkToken = async (request: LinkTokenCreateRequest, user: User) => {
  const userIdToken = await getUserIdToken(user);

  console.log(userIdToken);

  return await axios
    .post<LinkTokenCreateResponse>("/api/link-tokens", { data: request }, { headers: { Authorization: `Bearer ${userIdToken}` } })
    .then(({ data }) => {
      console.log(data);
      return data.linkToken;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const apiPost = () => {};
