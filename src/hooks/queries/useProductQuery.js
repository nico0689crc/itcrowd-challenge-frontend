import { useQuery } from "react-query";
import { QueryService } from "../../lib/QueryService";
import API_ENDPOINTS from "../../utils/endpoints";

const productQueryServices = new QueryService(API_ENDPOINTS.PRODUCTS);

export const fetchProduct = async ({ queryKey }) => {
  const params = queryKey[1];
  const { data } = await productQueryServices.findOne({
    id: params.id,
  });

  return { data };
};

export const useProductQuery = params => {
  return useQuery([API_ENDPOINTS, params], fetchProduct);
};
