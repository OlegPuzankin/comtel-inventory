import * as Yup from "yup";
import React from 'react';
import Layout from '../../components/layout';
import { useFormik } from 'formik'
import { TextInput } from '../../components/ui/text-input';
import { Select } from '../../components/ui/select';
import { useGetItems } from '../../hooks/swr';
import axios from 'axios'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next';
import { ItemDoc } from '../../model/Item';
import { loadImage } from '../../utils/loadImage';
import { Loader } from '../../components/loader';
import { ImageUploadInput } from '../../components/ui/image-upload-input';
import { getSession } from 'next-auth/client';
import { GetItemResponse, PutItemResponse } from '../../interfaces/api_response';
import { measureUnits } from '../../utils/measureUnits';
import { itemTypes } from '../../utils/itemsType';
import { LoaderLinear } from '../../components/loader-linear';


function EditItem() {
  const [loading, setLoading] = React.useState(true)
  const [imageURL, setImageURL] = React.useState('')
  const [msg, setMsg] = React.useState('')
  const [item, setItem] = React.useState<ItemDoc>(null)
  const [image, setImage] = React.useState<File>(null)

  const router = useRouter()
  const { mutate: mutateItems } = useGetItems()
  // const { data: item } = useGetItem(router.query.id as string)

  React.useEffect(() => {

    async function loadItem() {
      setLoading(true)

      const { data } = await axios.get<GetItemResponse>(`/api/item/${router.query.id}`)
      if (data.success) {
        const item = data.data
        setItem(item)
        formik.setValues({
          name: item?.name,
          desc: item?.desc || '',
          quantity: item?.quantity,
          measure: item?.measure,
          serialNumber: item?.serialNumber || '',
          type: item.type
        })
        setLoading(false)
      } else {
        setLoading(false)
      }

    }

    loadItem()

  }, [])



  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      quantity: 1,
      measure: '',
      serialNumber: '',
      type: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Field can not be empty"),
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
        const { data } = await axios.put<PutItemResponse>(`/api/item/${item._id}`, { ...values, imageKey: imageUploadResponse?.key })
        mutateItems()
        setLoading(false)
        setMsg('Item Updated')
        setItem(data.data)
        // setTimeout(() => setMsg(''), 4000)

      } catch {
        setLoading(false)
      }
    },
  })

  async function deleteItem() {
    setLoading(true)
    await deleteImage()
    const res = await axios.delete(`/api/item/${item._id}`)
    mutateItems()
    router.push('/')
    setLoading(false)

  }


  function onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    setImage(e.target.files[0])
    const url = window.URL.createObjectURL(e.target.files[0])
    setImageURL(url)
  }

  async function deleteImage() {
    setLoading(true)
    const response = await axios.delete(`/api/aws-s3/delete?key=${item.imageKey}&id=${item._id}`)
    mutateItems()
    setItem({ ...item, imageKey: undefined } as ItemDoc)
    setImageURL('')
    setLoading(false)
  }

  if (!item) {
    return (
      <Layout title='Edit item' >
        <div className='loader-container'>
          <Loader />
        </div>
      </Layout>)
  }



  return (
    <Layout title='Edit item' >

      <div className='edit-item'>
        {loading && <div className='loader-linear-container'> <LoaderLinear /></div>}
        {msg && <div className='msg' onClick={() => setMsg('')}>{msg}</div>}

        <form onSubmit={formik.handleSubmit} className='edit-item-form'>
          <div className='left-side'>
            {/* NAME */}
            <TextInput
              label='name'
              error={formik.touched.name && formik.errors.name}
              inputProps={{
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
                name: 'name',
                value: formik.values.name,
              }} />
            {/* DESC */}
            <TextInput
              label='description'

              error={formik.touched.serialNumber && formik.errors.serialNumber}
              inputProps={{
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
                name: 'desc',
                value: formik.values.desc,

              }} />

            <TextInput
              label='serial number'
              error={formik.touched.serialNumber && formik.errors.serialNumber}
              inputProps={{
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
                name: 'serialNumber',
                value: formik.values.serialNumber,
              }} />


            <div className="sub-grid">
              <TextInput
                label='quantity'
                error={formik.touched.quantity && formik.errors.quantity}
                inputProps={{
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  name: 'quantity',
                  value: formik.values.quantity?.toString(),
                  type: 'number'
                }} />

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
              <button className='btn btn-ocean' type='button' onClick={() => router.push('/')}>назад</button>
              <button className='btn btn-navy' type='submit'>update</button>
              <button className='btn btn-punch' type='button' onClick={deleteItem}>delete</button>

            </div>
          </div>
          <div className='right-side'>
            <div className='image-col'>
              <span>item's image</span>
              {
                item.imageKey
                  ? <div className='item-img' style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${item.imageKey})` }}>
                    <div className='delete-img-btn' onClick={deleteImage}>delete image</div>
                  </div>
                  : <ImageUploadInput
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                    onChangeHandler={onFileSelect}
                  />
              }
            </div>
          </div>
        </form>
        {/* {loading && <div className='loader-container'>
          <Loader />
        </div>} */}
      </div>
    </Layout>
  )
}

export default EditItem

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  // const { data } = await axios.get(`${process.env.BASE_URL}/api/item/${params.id}`)

  const session = await getSession({ req })

  // ('session=>', session);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      item: "foo",
    }
  }


}
