import cn from 'classnames'
interface Props {
  items: Array<{ value: string, displayText: string }>
  label: string,
  error: string;

  selectProps: {
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void

    name: string,
    value: string,
    // placeholder?: string
  }
}

export function Select({ label, selectProps, error, items }: Props) {

  return (
    <div className='select-wrapper' >
      <select
        className={cn('select', { error })}
        {...selectProps}
      >
        <option value='' >Select</option>
        {

          items?.map(i => {
            return <option value={i.value} key={i.value}>{i.displayText}</option>
          })
        }
      </select>
      <span className='label'>{label}</span>
      <span className='error-text'>{error}</span>
    </div>
  )
}