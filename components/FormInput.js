export default function FormInput({ value, onChange }) {
  return (
    <>
      <input
        type="text"
        name="ingredient"
        placeholder="Enter ingredient"
        value={value}
        onChange={onChange}
        required
      />
    </>
  );
}
