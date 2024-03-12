type InputProps = {
  label: string;
  type: string;
  name: string;
  defaultValue?: string;
};

function Input({ label, type, name, defaultValue }: InputProps) {
  return (
    <label className="block mt-5">
      {label}
      <br />
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="bg-d-gray-100 rounded-md w-full p-2 border-2 border-d-white hover:border-d-purple outline-none focus:border-d-purple"
        required
      />
    </label>
  );
}
export { Input };
