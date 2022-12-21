import { useEffect } from "react";
import useUser from "./useUser";

const usePlaidAccessTokenList = () => {
  const [user] = useUser();

  useEffect(() => {
    const getPlaidAccessTokenList = async () => {};

    getPlaidAccessTokenList();
  }, []);

  return {};
};

export default usePlaidAccessTokenList;
