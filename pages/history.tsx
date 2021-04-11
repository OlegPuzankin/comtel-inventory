import React from 'react'
import Layout from '../components/layout'
import { Loader } from '../components/loader'
import { TextInput } from '../components/ui/text-input'
import { useGetHistory } from '../hooks/swr'


function History() {
  const { data: histories } = useGetHistory()
  const [searchString, setSearchString] = React.useState('')

  if (!histories) {
    return <Layout title='History' >
      <div className='loader-container'>
        <Loader />
      </div>
    </Layout>
  }


  return (
    <Layout title='History' >
      <div className="container">
        <div className="search-input">
          <TextInput
            label={`search`}
            inputProps={{
              onChange: e => setSearchString(e.target.value),
              value: searchString,
            }} />
        </div>

        {histories.data.filter(history => {
          return (
            history.description.toLowerCase().includes(searchString.toLowerCase())
          )
        })
          .map(history => {
            return <div className='history-entry' key={history._id}>{history.description}</div>
          })}
      </div>
    </Layout>
  )

}

export default History

