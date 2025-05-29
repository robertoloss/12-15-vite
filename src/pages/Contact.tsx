import AnimationWrapper from '@/components/AnimationWrapper';
import z from 'zod';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect, useRef } from 'react';
import { usePage } from '@/utils/my-store';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
	const nameInputRef = useRef<HTMLInputElement>(null)
	const emailInputRef = useRef<HTMLInputElement>(null)
	const messageInputRef = useRef<HTMLTextAreaElement>(null)
	const captchaRef = useRef<ReCAPTCHA | null>(null)

	const [submitted, setSubmitted] = useState(false)
	const [_nameFocus, setNameFocus] = useState(false)
	const [_emailFocus, setEmailFocus] = useState(false)
	const [_messageFocus, setMessageFocus] = useState(false)
  const [messageValue, setMessageValue] = useState<string | undefined>("")
	const [showReCaptcha, setShowReCaptcha] = useState(false)
  const [error, setError] = useState(false)

	const { pageOpen, setPageOpen } = usePage()
	const location = useLocation()
	
	useEffect(()=>{
		setPageOpen(true)
	},[setPageOpen,location])

  const recaptchaOnChange = () => {
    emailjs.sendForm(	process.env.EMAILJS_SERVICE_ID!,
											process.env.EMAILJS_TEMPLATE_ID!, 
											form.current!, 
											process.env.EMAILJS_PUBLIC_KEY!)
		.then((result) => {
				console.log(result.text);
		}, (error) => {
				console.log(error.text);
		});
		setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setShowReCaptcha(false)
    }, 3000)
    setMessageValue("")
		if (nameInputRef.current) nameInputRef.current.value = ""
		if (emailInputRef.current) emailInputRef.current.value = ""
		if (messageInputRef.current) messageInputRef.current.value = ""
  };
  
  useEffect(()=>{
    if (messageInputRef.current) {
      messageInputRef.current.style.height = 'auto'
      messageInputRef.current.style.height = `${messageInputRef.current.scrollHeight}px`
    }
  },[messageValue, _messageFocus])
  
  const emailSchema = z.string().email().nonempty()
  const nameSchema = z.string().nonempty()
  const messageSchema = z.string().nonempty()

  function buttonHandler() {
    try {
      emailSchema.parse(emailInputRef.current!.value)
      nameSchema.parse(nameInputRef.current!.value)
      messageSchema.parse(messageInputRef.current!.value)
      console.log(nameSchema.parse(nameInputRef.current!.value))
      setShowReCaptcha(true)
    } catch(error) {
      setError(true)
      return
    }
	}

	function nameLabelHandler() {
		nameInputRef.current?.focus()
		setNameFocus(true)
	}
	function emailLabelHandler() {
		emailInputRef.current?.focus()
		setEmailFocus(true)
	}
	function messageLabelHandler() {
		messageInputRef.current?.focus()
		setMessageFocus(true)
	}
  
  function isThisErroring(value: string | undefined, schemaFn: (s: string | undefined) => string) {
    try {
      schemaFn(value)
      console.log("isThisErroring: false", value)
      return false
    } catch {
      console.log("isThisErroring: false", value)
      return true
    }
  }

	function inputClassName(input: "nameOrEmail" | "message") : string {
		const common = `flex flex-col items-center px-2 pt-6 pb-2 rounded-sm border-2 text-primary 
				focus:outline-none focus:ring-0 focus:border-blue-600  focus:border-2 `
		const specific = {
			nameOrEmail: ' h-[56px] ',
			message:  ' h-[64px] ',
		}
		return specific[input] + common
	}
  const labelTailwind = [
    'flex absolute top-[16px] text-primary z-10 ml-[10px] font-normal', 
    "transition-all ease-out duration-100",
    "peer-focus:top-[10px] peer-focus:text-xs", 
    "text-gray-400 peer-focus:text-blue-800"
  ]
  const inputFilledTailwind = "top-[10px] text-xs text-blue-800"

	window.scrollTo(0,0)

  console.log("error", error)

  return (<div className='min-h-screen text-foreground'>
		<AnimationWrapper pageOpen={pageOpen}>
			<div className="flex flex-col w-full items-center py-20  
				 px-6 gap-y-4 min-h-[calc(100vh-290px)]"
			>
				<svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M28 7.75C28 16.5 15.0262 23.5825 14.4737 23.875C14.3281 23.9533 14.1654 23.9943 14 23.9943C13.8346 23.9943 13.6719 23.9533 13.5262 23.875C12.9737 23.5825 0 16.5 0 7.75C0.00231592 5.69528 0.819575 3.72539 2.27248 2.27248C3.72539 0.819575 5.69528 0.00231592 7.75 0C10.3312 0 12.5912 1.11 14 2.98625C15.4088 1.11 17.6688 0 20.25 0C22.3047 0.00231592 24.2746 0.819575 25.7275 2.27248C27.1804 3.72539 27.9977 5.69528 28 7.75Z" fill="#F96263"/>
				</svg>
				<h1 className="text-4xl text-center font-semibold text-destructive">
					Thanks for visiting my website!
				</h1>
				<p className='w-full max-w-[440px] text-center text-lg font-light'>
					Looking for a Product Designer or eager to explore some creative ideas? I’d love to hear from you! 
					Send me an email at <a href="mailto:amynicolejackson@gmail.com" target='_blank' className='text-destructive'> amynicolejackson@gmail.com </a> or simply fill in the form below.
				</p>
					<div className='flex flex-col w-full max-w-[400px]'>
						<form 
							ref={form} 
							onSubmit={(e)=>e.preventDefault()} 
							className='flex flex-col w-full gap-y-4'>
							<div className='flex relative flex-col'>
								<input 
									ref={nameInputRef}
									type="text"
									name="user_name"
                  placeholder=' '
									className={
                    'peer' + 
                    inputClassName("nameOrEmail") +
                    `${error && isThisErroring(nameInputRef.current?.value, nameSchema.parse)
                      ? "border-destructive focus:border-destructive" 
                      : "border-white"
                    }`
                  }
									onFocus={()=>{
                    setError(false)
                    setNameFocus(true)}
                  }
									onBlur={()=>{
                    setNameFocus(false)
                  }}
								/>
								<label 
									className={cn(
                    "cursor-pointer",
                    "pointer-events-none",
                    ...labelTailwind,
                    {
                      [inputFilledTailwind] : nameInputRef.current?.value
                    }
                  )}
									onClick={nameLabelHandler}
								> 
									Name 
								</label>
							</div>
							<div className='flex relative flex-col'>
								<input 
									ref={emailInputRef}
									type="email"
									name="user_email"
									className={
                    'peer' + 
                    inputClassName("nameOrEmail") +
                    `${error && isThisErroring(emailInputRef.current?.value, emailSchema.parse)
                      ? "border-destructive focus:border-destructive" 
                      : "border-white"
                    }`
                  }
									onFocus={()=>{
                    setError(false)
                    setEmailFocus(true)}
                  }
									onBlur={()=>setEmailFocus(false)}
								/>
								<label 
									className={cn(
                    "cursor-pointer",
                    "pointer-events-none",
                    ...labelTailwind,
                    {
                      [inputFilledTailwind]: emailInputRef.current?.value
                    }
                  )}
									onClick={emailLabelHandler}
								> 
									Email 
								</label>
							</div>

							<div className='flex relative flex-col'>
								<textarea 
									ref={messageInputRef}
									name="message"
                  value={messageValue}
                  onChange={(e)=>setMessageValue(e.target.value)}
									className={
                    'peer' + ' p-10 ' + 
                    inputClassName("message") +
                    `${error && isThisErroring(messageInputRef.current?.value, messageSchema.parse)
                      ? "border-destructive focus:border-destructive" 
                      : "border-white"
                    }`
                  }
									onFocus={()=>{
                    setError(false)
                    setMessageFocus(true)}
                  }
									onBlur={()=>setMessageFocus(false)}
                  style={{ height: '64px' }}
								/>
								<label 
									className={cn(
                    "cursor-pointer",
                    "pointer-events-none",
                    ...labelTailwind,
                    {
                      [inputFilledTailwind]: messageInputRef.current?.value
                    }
                  )}
									onClick={messageLabelHandler}
								> 
									Message 
								</label>
							</div>
						<div className='h-12 flex flex-col items-center justify-center'>
							{(showReCaptcha && !submitted) && <h1> Click on the reCAPTCHA to send the email </h1>}
							{submitted && <h1 className='py-1 px-2 font-light '>Email Sent!</h1>}
							{!showReCaptcha && 
								<button
									className='py-1 px-2 bg-destructive hover:bg-[#C75D5D] w-[88px] h-10
                    rounded-md
										self-center text-white cursor-pointer'
									onClick={buttonHandler}
								>
									Send 
								</button>
							}
						</div>
						{showReCaptcha && 
							<div className='flex flex-col self-center'>
								<div className='flex w-[300px] h-[74px] bg-gray-100 border border-gray-300 animate-pulse'/>
								<ReCAPTCHA 
									ref={captchaRef}
									sitekey={process.env.CAPTCHA_SITE_KEY!}
									onChange={recaptchaOnChange}
									className='self-center -mt-[74px] z-20'
								/>
								<button
									className='py-1 px-2 bg-destructive mt-4 hover:bg-[#C75D5D] w-[88px] h-10
                    rounded-md
										self-center text-white cursor-pointer'
									onClick={()=>setShowReCaptcha(false)}
								>
									Cancel 
								</button>
							</div>
						}
					</form>
				</div>
				</div>

			</AnimationWrapper>
		</div>
  );
}
