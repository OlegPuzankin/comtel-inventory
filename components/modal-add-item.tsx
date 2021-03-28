import { useFormik } from 'formik';
import React from 'react';
import { TextInput } from './ui/text-input';
import * as Yup from "yup";
import axios from 'axios';
import { Select } from './ui/select';
import cn from 'classnames'
import useSWR, { trigger, mutate } from 'swr';
import { GetLocationsResponse, GetPresignURLResponse } from '../interfaces/api_response';
import { LocationDoc } from '../model/Location';
import { AddImageIcon } from './icons/add-image-icon';
import { CustomFileInput } from './ui/custom-file-input';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Loader } from './loader';
import { loadImage } from '../utils/loadImage';
import { ItemType } from '../interfaces/common_interfaces';

interface Props {
  show: boolean,
  close: () => void
  data: Array<LocationDoc>

}


const itemTypes = [
  {
    value: ItemType.Tool,
    displayText: 'Інструмент'
  },
  {
    value: ItemType.Materail,
    displayText: 'Матеріали'
  },]


export function ModalAddItem({ show, close, data }: Props) {

  const [loading, setLoading] = React.useState(false)
  const [image, setImage] = React.useState<File>(null)
  // const location = useTypedSelector(state => state.main.location)

  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      type: 'material'
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Field can not be empty"),
      location: Yup.string().required("Select can not be empty"),
    }),
    onSubmit: async (values) => {
      setLoading(true)

      try {
        let imageUploadResponse = null
        if (image) {
          imageUploadResponse = await loadImage(image)
          if (imageUploadResponse.status === 200)
            console.log('image was uploaded');
        }
        const response = await axios.post('/api/item', { ...values, imageKey: imageUploadResponse?.key })
        if (response.status === 201) {
          formik.setFieldValue('name', '')
          setImage(null)
          setLoading(false)
          mutate('/api/item')
          close()
        }
      } catch {
        setLoading(false)
      }
    }
  })

  // React.useEffect(() => {
  //   formik.setFieldValue('location', location?._id)
  // }, [location])

  function onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    setImage(e.target.files[0])
  }

  console.log(formik.values);



  return (
    <div className={cn('modal-backdrop', { 'modal-backdrop--visible': show })}>
      <div className={cn('modal', { 'modal--visible': show })}>
        <div className='modal-header'>Add item</div>
        <form onSubmit={formik.handleSubmit} className='form'>
          <TextInput
            label={`item's name`}

            error={formik.touched.name && formik.errors.name}
            inputProps={{
              onChange: formik.handleChange,
              onBlur: formik.handleBlur,
              name: 'name',
              value: formik.values.name,

            }} />
          <Select
            label='select location'
            error={formik.touched.location && formik.errors.location}
            items={data?.map(l => ({ value: l._id, displayText: l.name }))}
            selectProps={{
              onChange: formik.handleChange,
              onBlur: formik.handleBlur,
              name: 'location',
              value: formik.values.location
            }}
          />
          <Select
            label='select type'
            error={formik.touched.type && formik.errors.type}
            items={itemTypes.map(itemType => ({ value: itemType.value, displayText: itemType.displayText }))}
            selectProps={{
              onChange: formik.handleChange,
              onBlur: formik.handleBlur,
              name: 'type',
              value: formik.values.type
            }}
          />

          <CustomFileInput fileName={image?.name} onChangeHandler={onFileSelect} />
          <div className='form-buttons mt-1'>
            <button className='btn btn-navy py-1' type='submit'>add item</button>
            <button className='btn btn-punch py-1' type='button' onClick={close}>cancel</button>
          </div>
        </form>

      </div>

      {loading && <div className='container'>
        <Loader />
      </div>}

    </div>
  )
}