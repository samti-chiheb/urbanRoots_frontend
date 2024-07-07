const FormInput = ({ label, type, register, error }) => (
  <div className={"flex flex-col space-y-1"}>
    <label className={` ${error ? "text-red-600" : "text-gray-700"}`}>
      {error || label}
    </label>
    <input
      id={label}
      type={type}
      {...register}
      className={`border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 w-full ${
        error ? "border-red-300" : ""
      }`}
    />
  </div>
);

export default FormInput;
