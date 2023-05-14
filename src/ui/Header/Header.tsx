import Head from "next/head"
import { PropsWithChildren } from "react"

export type HeadTypeProps = PropsWithChildren <{
    title: string
}> 

const HeaderTitle = ({title , children}: HeadTypeProps) => {
  return (
    <>
       <Head>
        <title>{title}</title>
        </Head>
        {children}
    </>  
  )
}

export default HeaderTitle;