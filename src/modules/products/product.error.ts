const name_errors = {
  required_error: "ERROR(Missing): Name is required for signup ",
  invalid_type: "ERROR(Invalid Type): Name should be of the string data type",
  min_length: "ERROR(Invalid Length): Name should be longer than 2 Characters",
  max_length: "ERROR(Invalid Length): Name cannot be longer than 50 Characters",
};

const description_errors = {
  invalid_type:
    "ERROR(Invalid Type): Description should be of the string data type",
  min_length: "ERROR(Invalid Length): Email should be longer than 6 Characters",
  max_length:
    "ERROR(Invalid Length): Email cannot be longer than 100 Characters",
};

const price_errors = {
  required_error: "ERROR(Missing): Price is required for product creation ",
  invalid_type: "ERROR(Invalid Type): Price should be of the number data type",

  min_value: "ERROR(Invalid Price): Price should be greater than 0Rs",
  max_value: "ERROR(Invalid Price): Price cannot be greater than 10000000Rs",
};

const discount_errors = {
  invalid_type:
    "ERROR(Invalid Type): Discount should be of the number data type",
  min_value: "ERROR(Invalid Length): Password should be longer than 1%",
  max_value: "ERROR(Invalid Length): Password cannot be longer than 99%",
};

export { name_errors, description_errors, price_errors, discount_errors };
