import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Alert from "../../components/Alert/Alert";
import "./LoginForm.css";

const LoginComponent = ({ formHook, mutation, errorsMutation, onSubmit }) => {
  return (
    <div className="login-form__container">
      <div className="login-form__header">
        <p className="login-form__form-description">
          Inicie sesión con su correo electrónico y contraseña
        </p>
      </div>

      <div className="login-form__content">
        {mutation.isError &&
          Array.isArray(errorsMutation) &&
          errorsMutation.map((error, index) => (
            <Alert
              key={index}
              title={error.title}
              description={error.detail}
              type="error"
              onClick={mutation.reset}
              closeable
            />
          ))}
        <form onSubmit={formHook.handleSubmit(onSubmit)}>
          <Input
            id="email"
            type="text"
            label="Correo electrónico"
            error={formHook?.formState?.errors?.email?.message}
            register={formHook.register}
          />

          <Input.Password
            id="password"
            type="password"
            label="Contraseña"
            error={formHook?.formState?.errors?.password?.message}
            register={formHook.register}
          />

          <Button
            htmlType="submit"
            shape="round"
            text="Iniciar sesión"
            type="primary"
            loadingText="Iniciando"
            loading={mutation.isLoading}
            block
            onClick={() => {}}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
