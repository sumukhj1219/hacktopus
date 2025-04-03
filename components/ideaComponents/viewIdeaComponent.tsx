import Link from 'next/link'
import React from 'react'

interface ViewIdeaComponentInterface{
  title:string,
  theme:string,
  id:string
}

const ViewIdeaComponent = ({id, title}:ViewIdeaComponentInterface) => {
  return (
    <Link href={`/ideas/${id}`}>
    <div className='w-full bg-gradient-to-br from-purple-400 via-purple-600 to-purple-900 rounded-lg p-4 flex items-center justify-center'>
      {title}
    </div>
    </Link>
    
  )
}

export default ViewIdeaComponent