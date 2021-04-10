import React from 'react'
import Layout from '../components/layout'
import { Loader } from '../components/loader'
import { TextInput } from '../components/ui/text-input'
import { useGetHistory } from '../hooks/swr'
import { useScrollPosition } from '../hooks/useScrollPosition'


function History() {
  const { data: histories } = useGetHistory()
  const [searchString, setSearchString] = React.useState('')
  // const [divPosition, setDivPosition] = React.useState(100)

  // useScrollPosition(({ prevPosition, currentPosition }) => {
  //   setDivPosition(Math.abs(currentPosition.y) + 50)
  // }, [], null, false, 25)


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
        {/* <div className='floating' style={{ top: `${divPosition}px` }}>Test</div> */}

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

