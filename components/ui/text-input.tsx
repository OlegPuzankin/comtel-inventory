import cn from 'classnames'
interface Props {
  label: string,
  error?: string;

  inputProps: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    name?: string,
    value: string,
    placeholder?: string
    type?: string
  }
}

export function TextInput({ label, inputProps, error }: Props) {
  if (!inputProps.type)
    inputProps.type = 'text'

  return (
    <div className='text-input-wrapper' >
      <input className={cn('input', { error })} {...inputProps} />
      <span className='label'>{label}</span>
      <span className='error-text'>{error}</span>
    </div>
  )
}