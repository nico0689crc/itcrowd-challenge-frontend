import { useMutation, useQueryClient } from "react-query";
import { QueryService } from "../../lib/QueryService";
import API_ENDPOINTS from "../../utils/endpoints";

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    id => {
      const productQueryServices = new QueryService(API_ENDPOINTS.PRODUCTS);
      return productQueryServices.delete({
        id,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
      },
    }
  );
};
