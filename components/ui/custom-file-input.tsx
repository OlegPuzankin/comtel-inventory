interface Props {
  fileName: string,
  onChangeHandler: Function
}

export function CustomFileInput({ fileName, onChangeHandler }: Props) {
  return (
    <div className='custom-file-upload-wrapper'>
      <label className="custom-file-upload-input">
        <input type="file" accept="image/*" onChange={(e) => onChangeHandler(e)} />
        <div className="label-text"> Select file</div>
        <svg className='icon' version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <title>add_photo_alternate</title>
          <path d="M5.016 18.984h12l-4.031-4.969-3 3.984-1.969-3zM15.984 11.016h3v7.969q0 0.797-0.586 1.406t-1.383 0.609h-12q-0.797 0-1.406-0.609t-0.609-1.406v-12q0-0.797 0.609-1.383t1.406-0.586h7.969v3h3v3zM18.984 6.984v3h-1.969v-3h-3v-1.969h3v-3h1.969v3h3v1.969h-3z"></path>
        </svg>
      </label>
      <span className='custom-file-upload-filename'>{fileName ? fileName : 'No image selected'}</span>

    </div>
  )
}