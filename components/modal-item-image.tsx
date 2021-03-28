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
import { AWS_URL } from '../utils/const_variables';

interface Props {
  show: boolean,
  close: Function,
}



export function ModalItemImage({ show, close }: Props) {
  const [loading, setLoading] = React.useState(false)
  const { window } = useTypedSelector(state => state.ui)

  const imageKey = window?.slice(11)
  console.log(imageKey);




  return (
    <div className={cn('modal-backdrop', { 'modal-backdrop--visible': show })}>
      <div className={cn('modal', { 'modal--visible': show })}>
        <div className='image-wrapper'>
          <div className='modal-item-image' style={{ backgroundImage: `url(${AWS_URL}/${imageKey})` }}>
            <div className='close-icon' onClick={() => close()}>&#10006;</div>
          </div>
        </div>

      </div>

      {/* {loading && <div className='container'>
        <Loader />
      </div>} */}
    </div>
  )
}