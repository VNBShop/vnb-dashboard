import Image from 'next/image'

import SigninForm from '@/components/form/signin'

import Logo from '/public/icon.png'

export default function Auth() {
  return (
    <section className="fixed inset-0 -mt-28 flex flex-col items-center justify-center space-y-7">
      <Image width={50} height={50} src={Logo} alt="logo" sizes="100vw" />

      <h1 className="text-lg font-medium">Signin to VNB Dashboard</h1>

      <SigninForm />

      <div
        className="absolute left-0 top-0 z-[-1] hidden h-full w-full bg-[linear-gradient(to_top,#000_0%,transparent_1.5%),linear-gradient(to_left,#000_0%,transparent_1.5%)] opacity-10 md:block"
        style={{ backgroundSize: '35px 35px' }}
      ></div>

      <div className="absolute bottom-0 left-0 hidden h-[80px] w-full bg-[linear-gradient(rgba(255,255,255,0),#FFF)] dark:bg-[linear-gradient(rgba(0,0,0,0),#1A1A1A)] md:block"></div>

      <div className="absolute inset-x-0 bottom-3 z-[2] flex items-center justify-center text-sm">
        Powered by VNB DevTeam
      </div>
    </section>
  )
}
