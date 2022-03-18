import CurrencyFormat from "react-currency-format";

const PriceFormater = ({ price }) => {
  return (
    <CurrencyFormat
      value={price}
      displayType={"text"}
      thousandSeparator={true}
      decimalSeparator=","
      prefix={`USD `}
      thousandSeparator="."
      fixedDecimalScale={true}
      decimalScale={2}
      renderText={value => value}
    />
  );
};

export default PriceFormater;
