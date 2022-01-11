import { DEV_SERVER_URL, PROD_SERVER_URL } from "@env";

const devEnvironmentVariable = {
  DEV_SERVER_URL,
};

const ProdEnvironmentVariable = {
  PROD_SERVER_URL,
};

export default __DEV__ ? devEnvironmentVariable : ProdEnvironmentVariable;
