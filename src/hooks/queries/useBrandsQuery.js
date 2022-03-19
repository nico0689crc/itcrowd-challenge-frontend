import { useQuery } from "react-query";
import { QueryService } from "../../lib/QueryService";
import API_ENDPOINTS from "../../utils/endpoints";

const brandsQueryServices = new QueryService(API_ENDPOINTS.BRANDS);

export const fetchBrands = async ({ queryKey }) => {
  const fetchedData = await brandsQueryServices.getAll();

  const { data } = fetchedData;

  const brands = data.map(brand => {
    return {
      value: brand.id,
      label: brand.name,
    };
  });

  return brands;
};

export const useBrandsQuery = () => {
  return useQuery([API_ENDPOINTS.BRANDS], fetchBrands);
};
