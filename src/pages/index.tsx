import Accueil from '@/Components/Accueil'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div>
      <Accueil/>
    </div>
    </>
  )
}
