export default function Input({ labelTitle, inputName, inputValue, error, inputType = "text", onChange }) {
  return (
    <div className='flex flex-col gap-3'>
      <label htmlFor={inputName} className='text-slate-600 font-semibold'>
        {labelTitle}
      </label>
      <input
        type={inputType}
        defaultValue={inputValue}
        name={inputName}
        className='border rounded-full border-slate-300 p-2'
        onChange={onChange}
      />
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
}
