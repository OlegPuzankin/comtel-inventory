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
import { measureUnits } from '../utils/measureUnits';
import { useActions } from '../hooks/useActions';
import { itemTypes } from '../utils/itemsType';
import { LoaderLinear } from './loader-linear';
import { useSession } from 'next-auth/client';

interface Props {
  data: Array<LocationDoc>
}


export function ModalAddItem({ data }: Props) {
  const { closeModal } = useActions()

  const [loading, setLoading] = React.useState(false)
  const [image, setImage] = React.useState<File>(null)
  const [session] = useSession()
  // const location = useTypedSelector(state => state.main.location)

  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      type: 'material',
      measure: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Item\'s name can not be empty"),
      location: Yup.string().required("Location can not be empty"),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        console.log(session.user.email);
        const response = await axios.post('/api/item', { ...values, createdBy: session?.user.email })
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



  return (
    <div className='modal-backdrop'>
      <div className='modal'>
        {loading && <div className='loader-linear-container'> <LoaderLinear /></div>}
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
            <div className='form-btn' onClick={() => formik.submitForm()}>add item</div>
            <div className='form-btn' onClick={closeModal}>cancel</div>
          </div>
        </form>

      </div>
    </div>
  )
}