import { useFormik } from 'formik';
import React from 'react';
import { TextInput } from './ui/text-input';
import * as Yup from "yup";
import axios from 'axios';
import cn from 'classnames'
import useSWR, { trigger, mutate } from 'swr';
import { useGetItems, useGetLocations, useGetUsers } from '../hooks/swr';
import { Select } from './ui/select';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { LocationDoc } from '../model/Location';
import { PutLocationResponse } from '../interfaces/api_response';
import { getCountItems } from '../utils/getCountItems';
import { Loader } from './loader';
import { LocationType } from '../interfaces/common_interfaces';

interface Props {
  show: boolean,
  close: () => void

}


const locationTypes = ['stock', 'location']

export function ModalLocation({ show, close }: Props) {
  const [loading, setLoading] = React.useState(false)
  const { window } = useTypedSelector(state => state.ui)
  const { location } = useTypedSelector(state => state.main)
  const { data: items } = useGetItems()
  const { setLocation } = useActions()

  // console.log(location);




  const formik = useFormik({
    initialValues: {
      name: location?.name || '',
      locationType: location?.locationType || LocationType.Location
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Field can not be empty"),
      // user: Yup.string().required("Field can not be empty"),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        // add new location
        if (window === 'location') {
          const response = await axios.post('/api/location', values)

          if (response.status === 201) {
            setLoading(false)
            formik.resetForm()
            mutate('/api/location')
          }
        } else {
          // edit existing location
          const { status, data: { data: loc } } = await axios.put<PutLocationResponse>(`/api/location/${location._id}`, values)

          if (status === 200) {
            delete loc.timestamp
            delete loc.__v
            setLocation(loc)
            formik.resetForm()
            mutate('/api/location')
            setLoading(false)
            close()
          }
        }
      } catch {
        setLoading(false)
      }

    }
  })

  function cancel() {
    formik.resetForm()
    close()
  }

  async function deleteLocation() {
    try {
      setLoading(true)
      await axios.delete(`/api/location/${location._id}`)
      mutate('/api/location')
      setLocation(null)
      setLoading(false)
      close()
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  function canDelete() {
    return window === 'edit-location' && !Boolean(getCountItems(location?._id, items?.data))
  }

  React.useEffect(() => {
    if (window === 'edit-location')
      formik.setValues({ name: location.name, locationType: location.locationType })
  }, [window])

  return (
    <div className={cn('modal-backdrop', { 'modal-backdrop--visible': show })}>
      <div className={cn('modal', { 'modal--visible': show })}>
        <div className='modal-header'>
          {window === 'location'
            ? 'Add location'
            : 'Edit Location'
          }
        </div>
        <form onSubmit={formik.handleSubmit} className='form'>
          <TextInput
            label={`location's name`}

            error={formik.touched.name && formik.errors.name}
            inputProps={{
              onChange: formik.handleChange,
              onBlur: formik.handleBlur,
              name: 'name',
              value: formik.values.name,

            }} />
          <Select
            label='select stock type'
            error={formik.touched.locationType && formik.errors.locationType}
            items={locationTypes.map((l) => ({ value: l, displayText: l }))}
            selectProps={{
              onChange: formik.handleChange,
              onBlur: formik.handleBlur,
              name: 'locationType',
              value: formik.values.locationType
            }}
          />

          <div className='form-buttons'>
            <button className='btn btn-ocean py-1' type='submit'>
              {window === 'location'
                ? 'Add location'
                : 'Update Location'
              }
            </button>
            <button className='btn btn-punch py-1' type='button' onClick={cancel}>cancel</button>
            {canDelete() && <button className='btn btn-navy py-1' type='button' onClick={deleteLocation}>delete</button>}
          </div>
        </form>


      </div>

      {loading && <div className='container'>
        <Loader />
      </div>}
    </div>
  )
}