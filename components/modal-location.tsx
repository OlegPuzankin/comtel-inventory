import { useFormik } from 'formik';
import React from 'react';
import { TextInput } from './ui/text-input';
import * as Yup from "yup";
import axios from 'axios';
import useSWR, { trigger, mutate } from 'swr';
import { useGetItems, useGetLocations, useGetUsers } from '../hooks/swr';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { PutLocationResponse } from '../interfaces/api_response';
import { getCountItems } from '../utils/getCountItems';
import { LocationType } from '../interfaces/common_interfaces';
import { LoaderLinear } from './loader-linear';



const locationTypes = ['stock', 'location']

export function ModalLocation() {
  const { closeModal } = useActions()
  const [loading, setLoading] = React.useState(false)
  const { window } = useTypedSelector(state => state.ui)
  const { location } = useTypedSelector(state => state.main)
  const { data: items } = useGetItems()
  const { setLocation } = useActions()

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
          const response = await axios.post('/api/location', { name: values.name, locationType: LocationType.Location })

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
            closeModal()
          }
        }
      } catch {
        setLoading(false)
      }

    }
  })

  function cancel() {
    formik.resetForm()
    closeModal()
  }

  async function deleteLocation() {
    try {
      setLoading(true)
      await axios.delete(`/api/location/${location._id}`)
      mutate('/api/location')
      setLocation(null)
      setLoading(false)
      closeModal()
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
    <div className='modal-backdrop'>
      <div className='modal'>
        {loading && <div className='loader-linear-container'> <LoaderLinear /></div>}

        <div className='modal-header'>
          {
            window === 'location'
              ? 'Add location'
              : 'Edit Location'
          }

        </div>

        <form onSubmit={formik.handleSubmit} className='form'>
          <div className='fields'>
            <div className="grid-col-3">
              <TextInput
                label={`location's name`}

                error={formik.touched.name && formik.errors.name}
                inputProps={{
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  name: 'name',
                  value: formik.values.name,

                }} />
            </div>

          </div>

          <div className='form-buttons'>

            <div className='form-btn' onClick={() => formik.submitForm()}>
              {window === 'location'
                ? 'Add location'
                : 'Update Location'
              }
            </div>

            {canDelete() && <div className='form-btn' onClick={deleteLocation}>delete</div>}
            <div className='form-btn' onClick={cancel}>Cancel</div>
          </div>
        </form>


      </div>

      {/* {loading && <div className='loader-container'>
        <Loader />
      </div>} */}
    </div >
  )
}