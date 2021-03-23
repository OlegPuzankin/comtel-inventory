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

interface Props {
  show: boolean,
  close: Function

}



export function ModalResponsible({ show, close }: Props) {
  const [loading, setLoading] = React.useState(false)
  const { data: users } = useGetUsers()
  const { window } = useTypedSelector(state => state.ui)
  const { location } = useTypedSelector(state => state.main)
  // const { data: items } = useGetItems()
  const { setLocation } = useActions()
  const selectedItems = useTypedSelector(state => state.main.selectedItems)
  // (location);




  const formik = useFormik({
    initialValues: {
      responsibleId: ''
    },
    validationSchema: Yup.object({
      responsibleId: Yup.string().required("Field can not be empty"),
      // user: Yup.string().required("Field can not be empty"),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        if (window === 'location') {
          const response = await axios.post('/api/location', values)

          if (response.status === 201) {
            setLoading(false)
            formik.resetForm()
            mutate('/api/location')
          }
        } else {
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
    close()
  }

  async function selectUser(responsibleUserId: string) {

    const selectedItemsId = selectedItems.map(si => si._id)
    await axios.put(`/api/item/responsible`, { responsibleUserId, selectedItemsId })
    mutate('/api/item')
    close()

  }





  (formik.values);



  return (
    <div className={cn('modal-backdrop', { 'modal-backdrop--visible': show })}>
      <div className={cn('modal', { 'modal--visible': show })}>
        <div className='new-form-header'>
          Select responsible
        </div >
        <div className='users-list'>
          {
            users?.data.map(u => {
              return <div
                key={u._id}
                className='user'
                onClick={() => selectUser(u._id)}>
                {u.name}
              </div>
            })

          }
        </div>
        <div className='cancel-btn-wrapper'>
          <button className='btn btn-punch' type='button' onClick={cancel}>cancel</button>
        </div>

      </div>

      {loading && <div className='container'>
        <Loader />
      </div>}
    </div>
  )
}