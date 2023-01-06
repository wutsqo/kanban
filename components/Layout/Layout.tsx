import { Nunito_Sans } from "@next/font/google"
import { Header } from "./Header"
import Head from "next/head"
import { FC } from "react"

interface LayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

const nunitoSans = Nunito_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
})

export const Layout: FC<LayoutProps> = (props) => {
  const { children, description, title } = props

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={nunitoSans.className}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}
