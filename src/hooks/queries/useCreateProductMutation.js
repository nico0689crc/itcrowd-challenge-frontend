import { useMutation, useQueryClient } from "react-query";
import { QueryService } from "../../lib/QueryService";
import API_ENDPOINTS from "../../utils/endpoints";

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ values }) => {
      const productQueryServices = new QueryService(API_ENDPOINTS.PRODUCTS);
      return productQueryServices.post({
        values,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
      },
    }
  );
};
