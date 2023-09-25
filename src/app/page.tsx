'use client'
import { SyntheticEvent, useEffect, useState } from 'react'
import { getProducts } from '@/axios'
import { ProductType } from '@/types'
import Image from 'next/image'
import { textCutter } from '@/helpers/texts'
import Link from 'next/link'

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [process, setProcess] = useState({ status: '', loading: false })
  const [search, setSearch] = useState('')

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if(!search || search === '') return;

    setProcess({status: 'pending', loading: true})
    try{
      const res = await getProducts(search);
      if (res?.status === 200) {
        res.data && setProducts(res.data)
        setProcess({loading: false, status: 'succeed'})
      } else {
        setProcess({loading: false, status: 'failed'})
      }
    } catch(e) {
      setProcess({loading: false, status: 'failed'})
    }
  }

  return (
    <div className='w-full p-20 flex flex-col items-center justify-center gap-[25px]'>
      <h1>Covanie Website !</h1>

      <form onSubmit={handleSubmit} className='w-full px-4 flex items-center gap-5'>
        <input className='h-[50px] w-full border-solid border-2 border-white rounded-[8px] px-5 py-2' type="text" placeholder='Entrez un mot clé !' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit" value="" className='bg-green-700 rounded-[8px] w-[54px] h-[54px] p-0'>Go !</button>
      </form>

      {process.loading 
        ? <div className='flex flex-col gap-[15px] items-center'>
            <div className='animate-spin border-solid border-[1px] border-white w-[50px] h-[50px] rounded-full border-t-0' />
            <h2>Fetching Data from Shein.com ...</h2>
          </div>
        : <div className='flex gap-4 w-full justify-center p-4 flex-wrap'>
          {products.map(({url, image, title, fullPrice}, index) => <Link key={index} href={`/products/single?href${url}`} className='w-[270px] p-[10px] border-solid border-2 border-gray-500 rounded-[8px] gap-[15px] flex flex-col'>
            <Image className='w-[250px] h-[250px] object-cover rounded-[4px]' width={300} height={300} src={image} alt={title} />
            <span className='flex justify-between w-full items-center h-max'>
              <h3 className='font-[500] text-gray-500 text-lg'>{textCutter(title, 6)}</h3>
              <span className='font-[800] h-full border-solid border-[1px] border-gray-800 rounded-[5px] p-2'>{fullPrice}</span>
            </span>
          </Link>)}     
        </div>}
    </div>
  )
}
