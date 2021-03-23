interface Props {
  cssClassName: string
}

export function FileIcon({ cssClassName }: Props) {
  return (
    <svg className={cssClassName} version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 28" fill='currentColor'>
      <title>file</title>
      <path d="M16 8v-7.375c0.219 0.141 0.406 0.281 0.562 0.438l6.375 6.375c0.156 0.156 0.297 0.344 0.438 0.562h-7.375zM14 8.5c0 0.828 0.672 1.5 1.5 1.5h8.5v16.5c0 0.828-0.672 1.5-1.5 1.5h-21c-0.828 0-1.5-0.672-1.5-1.5v-25c0-0.828 0.672-1.5 1.5-1.5h12.5v8.5z"></path>
    </svg>
  )
}