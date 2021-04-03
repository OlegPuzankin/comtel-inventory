import { useFormik } from 'formik';
import React from 'react';
import { TextInput } from './ui/text-input';
import * as Yup from "yup";
import axios from 'axios';
import { Select } from './ui/select';
import { mutate } from 'swr';
import { LocationDoc } from '../model/Location';
import { Loader } from './loader';
import { loadImage } from '../utils/loadImage';
import { ItemType } from '../interfaces/common_interfaces';
import { measureUnits } from '../utils/measureUnits';
import { useActions } from '../hooks/useActions';

interface Props {
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


export function ModalAddItem({ data }: Props) {
  const { closeModal } = useActions()

  const [loading, setLoading] = React.useState(false)
  const [image, setImage] = React.useState<File>(null)
  // const location = useTypedSelector(state => state.main.location)

  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      type: 'material',
      measure: ''
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

  // function onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
  //   debugger
  //   setImage(e.target.files[0])
  // }


  return (
    <div className='modal-backdrop'>
      <div className='modal'>
        <div className='modal-header'>Add item</div>
        <form onSubmit={formik.handleSubmit} className='form'>
          <div className='fields'>
            <div className='grid-col-3'>
              <TextInput
                label={`item's name`}

                error={formik.touched.name && formik.errors.name}
                inputProps={{
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  name: 'name',
                  value: formik.values.name,

                }} />
            </div>

            <div className='grid-col-3'>
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
            </div>

            <div className='grid-col-2'>
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
            </div>


            <Select
              label='meas.unit'
              error={formik.touched.measure && formik.errors.measure}
              items={measureUnits.map(mu => ({ value: mu.value, displayText: mu.displayText }))}
              selectProps={{
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
                name: 'measure',
                value: formik.values.measure
              }}
            />
          </div>

          <div className='form-buttons'>
            {/* <div>add item</div>
            <div>cancel</div> */}
            <button className='btn btn-transparent' type='submit'>add item</button>
            <button className='btn btn-transparent' type='button' onClick={closeModal}>cancel</button>
          </div>
        </form>

      </div>

      {loading && <div className='loader-container'>
        <Loader />
      </div>}

    </div>
  )
}