import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import InstaComponent from './InstaComponent'

export default function EmailForm() {
  const [display, setDisplay] = useState('none')

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_8ihmqfv',
        'template_yejdewr',
        form.current,
        'XgrmG1fdI59ZO5GIi'
      )
      .then(
        (result) => {
          console.log('sent')
          if (display === 'none') {
            setDisplay('block')
            setTimeout(() => {
              setDisplay('none')
            }, 5000)
          }
          e.target.reset()
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  // function filter() {
  //   const canvas = document.getElementsByTagName('canvas')[0]

  //   canvas.className = 'filter grayscale blur-md contrast-200'

  // }

  // filter()
  return (
    <>
      <div className="relative z-10 flex flex-col-reverse items-center justify-center h-screen p-5">
        <div className="mx-auto w-full max-w-[550px] max-lg:mx-[0px]">
          <form ref={form} id="contact-form" onSubmit={sendEmail}>
            <div className="mb-5">
              <label
                form="name"
                className="mb-3 block text-base font-medium text-[#494949]"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#4949496B7280] outline-none focus:border-[#acacac] focus:shadow-md"
                required
              />
            </div>
            <div className="mb-5">
              <label
                form="email"
                className="mb-3 block text-base font-medium text-[#494949]"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#4949496B7280] outline-none focus:border-[#acacac] focus:shadow-md"
                required
              />
            </div>
            <div className="mb-5">
              <label
                form="message"
                className="mb-3 block text-base font-medium text-[#494949]"
              >
                Message/Inquiry:
              </label>
              <textarea
                rows="4"
                name="message"
                id="message"
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#acacac] focus:shadow-md"
                required
              ></textarea>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <button className="hover:shadow-form bg-[grey] py-3 px-8 text-base font-semibold text-white outline-none w-[125px]">
                Submit
              </button>
              <div
                className="email-sent-notification"
                style={{ display: `${display}` }}
                id="sent-notification"
              >
                <div className="text-center font-semibold">email sent!</div>
              </div>
            </div>
          </form>
        </div>
        <InstaComponent />
      </div>
    </>
  )
}
