import { GetItemsResponse, GetLocationsResponse } from '../interfaces/api_response';
import { getSession } from 'next-auth/client';
import React from 'react';
import Layout from '../components/layout';
import { useGetItem, useGetItems, useGetLocations, useGetUsers } from '../hooks/swr';
import { ModalAddItem } from '../components/modal-add-item';
import { InventoryList } from '../components/inventory-list';
import { ModalLocation } from '../components/modal-location';
import { LocationsList } from '../components/locations-list';
import { GetServerSideProps } from 'next';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ModalItemImage } from '../components/modal-item-image';
import { Loader } from '../components/loader';


// const getFetcher = (url: string) => axios.get(url).then(res => res.data)


export default function Home() {
  const { closeModal } = useActions()
  const { show, window } = useTypedSelector(state => state.ui)




  const { data: locations, isValidating: isValidatingLocations, error: errorLocations } = useGetLocations()
  const { data: users, error: userError } = useGetUsers()
  const { data: items, error: itemsError } = useGetItems()

  // // !locations && !items
  // console.log('l', isValidatingLocations);
  // console.log('i', isValidatingItems);

  if (errorLocations || userError || itemsError) {
    console.log('loc--->', errorLocations, 'user--->', userError, 'items--->', itemsError);
    return <div>
      {errorLocations && <h1>{errorLocations}</h1>}
      {userError && <h1>{userError}</h1>}
      {itemsError && <h1>{itemsError}</h1>}
    </div>
  }

  if (!locations || !items) {
    return (
      <Layout title='Inventory' >
        <div className='loader-container'>
          <Loader />
        </div>
      </Layout>)
  }

  return (
    <Layout title='Inventory' >
      <div className='layout'>
        <div className='locations'>
          <LocationsList />
        </div>
        <div className='items'>
          <InventoryList />
        </div>
      </div>
      {/* modal add new item */}
      <ModalAddItem
        show={show && window === 'item'}
        close={closeModal}
        data={locations?.data} />
      <ModalLocation
        show={show && window === 'location' || window === 'edit-location'}
        close={closeModal}
      />
      <ModalItemImage
        show={show && /^show-image/.test(window)}
        close={() => closeModal()}
      />
    </Layout>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {

//   const session = await getSession({ req })

//   // ('session=>', session);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth',
//         permanent: false,
//       },
//     }
//   }



//   return {
//     props: {
//       item: "foo",
//     }
//   }
// }