import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import Alert from "../../../components/Alert/Alert";
import { useUpdateProductMutation } from "../../../hooks/queries/useUpdateProductMutation";
import { useCreateProductMutation } from "../../../hooks/queries/useCreateProductMutation";
import { useBrandsQuery } from "../../../hooks/queries/useBrandsQuery";
import "./ProductCreateEdit.css";
import { useContext } from "react";
import { ModalContext } from "../../../context/Modal";

const getFormSchema = product => {
  const formSchema = yup.object().shape({
    name: yup.string().required("Este campo es obligatorio."),
    image_url: yup.string().required("Este campo es obligatorio."),
    brand: yup.string().ensure().required("Este campo es obligatorio."),
    quantity: yup
      .number()
      .typeError("El valor de este campo deber ser  numérico")
      .positive("Este valor de este campo debe ser un número positivo."),
    price: yup
      .number()
      .typeError("El valor de este campo deber ser  numérico")
      .positive("Este valor de este campo debe ser un número positivo."),
    description: yup
      .string()
      .required("Este campo es obligatorio.")
      .min(30, "Este campo debe tener 30 caracteres."),
  });

  const defaultValues = {
    name: product ? product.name : "",
    image_url: product ? product.image_url : "",
    price: product ? product.price : "",
    brand: product ? product.brandId : "",
    description: product ? product.description : "",
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const ProductCreateEdit = ({ product, ...props }) => {
  const formHook = useForm(getFormSchema(product));
  const { closeModal } = useContext(ModalContext);

  const {
    mutate: updateProduct,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    data: dataCreated,
  } = useUpdateProductMutation();

  const {
    mutate: createProduct,
    isLoading: isLoadingCreate,
    error: errorCreate,
    isSuccess: isSuccessCreate,
    data: dataUpdated,
  } = useCreateProductMutation();

  const {
    isFetching: isFetchingBrands,
    data: brands,
    error: errorBrands,
  } = useBrandsQuery();

  const onSubmit = async data => {
    const dataToSend = {
      name: data.name,
      price: data.price,
      brand_id: data.brand,
      description: data.description,
      image_url: data.image_url,
    };

    if (product) {
      updateProduct({ id: product.id, values: dataToSend });
    } else {
      createProduct({ values: dataToSend });
    }
  };

  return (
    <div className="create-edit-product__container">
      <form onSubmit={formHook.handleSubmit(onSubmit)}>
        <h1>{product ? "Editar" : "Agregar"} producto</h1>
        {isSuccessCreate || isSuccessUpdate ? (
          <Alert
            title={`${product ? "Editado" : "Agregado"}`}
            description={`Su producto se ha ${
              product ? "editado" : "agregado"
            } correctamente, puede cerrar esta ventana tranquilamente.`}
            type="success"
            showIcon
          />
        ) : (
          <>
            <Input
              id="name"
              type="text"
              label="Nombre"
              error={formHook?.formState?.errors?.name?.message}
              register={formHook.register}
            />
            {brands && (
              <Select
                id="brand"
                name="brand"
                control={formHook.control}
                options={brands}
                placeholder="Seleccionar una marca"
                label="Marca"
                error={formHook?.formState?.errors?.brand?.message}
              />
            )}
            <Input
              id="image_url"
              type="text"
              label="Url de la imagen"
              error={formHook?.formState?.errors?.image_url?.message}
              register={formHook.register}
            />
            <Input
              id="price"
              type="text"
              label="Precio"
              error={formHook?.formState?.errors?.price?.message}
              register={formHook.register}
            />

            <Input
              id="description"
              type="textarea"
              label="Descripción"
              error={formHook?.formState?.errors?.description?.message}
              register={formHook.register}
            />
          </>
        )}

        {isSuccessCreate || isSuccessUpdate ? (
          <Button
            type="primary"
            htmlType="button"
            text="Cerrar ventana"
            block
            shape="round"
            onClick={() => {
              closeModal();
            }}
          />
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            text={product ? "Editar" : "Agregar"}
            block
            loadingText="Cargando"
            shape="round"
            loading={isLoadingCreate || isLoadingUpdate}
            onClick={() => {}}
          />
        )}
      </form>
    </div>
  );
};

export default ProductCreateEdit;
