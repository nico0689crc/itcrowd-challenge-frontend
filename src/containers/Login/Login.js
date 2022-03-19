import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalContext } from "../../context/Modal";
import { AuthContext } from "../../context/AuthContext";
import { useLoginMutation } from "../../hooks/queries/authQueries";
import LoginForm from "./LoginForm";

const getFormSchema = () => {
  const loginFormSchema = yup.object().shape({
    email: yup
      .string()
      .email(
        "El formato de dirección de correo electrónico proporcionado no es válido"
      )
      .required("Debe proporcionar su dirección de correo electrónico"),
    password: yup.string().required("Debe proporcionar su contraseña"),
  });

  const defaultValues = {
    email: "user_1@user.com",
    password: "user123!@",
  };

  return { loginFormSchema, defaultValues };
};

const LoginContainer = () => {
  const [errorsMutation, setErrorsMutation] = useState(null);
  const { closeModal } = useContext(ModalContext);
  const { login } = useContext(AuthContext);
  const mutation = useLoginMutation();
  const { loginFormSchema, defaultValues } = getFormSchema();

  const formHook = useForm({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async data => {
    mutation.mutate(data, {
      onError: error => {
        setErrorsMutation(error.response.data.errors);
      },
      onSuccess: res => {
        const attributes = res.data;
        login(attributes);
        closeModal();
      },
    });
  };

  return (
    <LoginForm
      formHook={formHook}
      mutation={mutation}
      errorsMutation={errorsMutation}
      onSubmit={onSubmit}
    />
  );
};

export default LoginContainer;
