type InputProps = {
  label: string;
  type: string;
  name: string;
};

export function Input({ label, type, name }: InputProps) {
  return (
    <label className="block mt-5">
      {label}
      <br />
      <input
        type={type}
        name={name}
        className="bg-d-gray-100 rounded-md w-full p-2 border-2 border-d-white hover:border-d-purple outline-none focus:border-d-purple"
        required
      />
    </label>
  );
}
