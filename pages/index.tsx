import PageDetails from '@/components/PageDetails'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>nauciProgramiranje.ba | Postani softverski inžinjer!</title>
      </Head>

      <main>
        <PageDetails
          title='nauciProgramiranje.ba'
          description='Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer.'
          btnText='Kupi i započni kurs'
          btnIcon=''
          btnAction=''
          hasCode={false}
        />

      </main>
    </>
  )
}
