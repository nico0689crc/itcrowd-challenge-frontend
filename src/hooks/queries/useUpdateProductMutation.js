import { useMutation, useQueryClient } from "react-query";
import { QueryService } from "../../lib/QueryService";
import API_ENDPOINTS from "../../utils/endpoints";

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, values }) => {
      const productQueryServices = new QueryService(API_ENDPOINTS.PRODUCTS);
      return productQueryServices.patch({
        id,
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
