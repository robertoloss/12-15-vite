import AnimationWrapper from '@/components/AnimationWrapper';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect, useRef } from 'react';
import { usePage } from '@/utils/my-store';
import { useLocation } from 'react-router-dom';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
	const nameInputRef = useRef<HTMLInputElement>(null)
	const emailInputRef = useRef<HTMLInputElement>(null)
	const messageInputRef = useRef<HTMLTextAreaElement>(null)
	const captchaRef = useRef<ReCAPTCHA | null>(null)
	const [submitted, setSubmitted] = useState(false)
	const [nameFocus, setNameFocus] = useState(false)
	const [emailFocus, setEmailFocus] = useState(false)
	const [messageFocus, setMessageFocus] = useState(false)
	const [showReCaptcha, setShowReCaptcha] = useState(false)
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
		if (nameInputRef.current) nameInputRef.current.value = ""
		if (emailInputRef.current) emailInputRef.current.value = ""
		if (messageInputRef.current) messageInputRef.current.value = ""
  };

  function buttonHandler() {
		setShowReCaptcha(true)
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

	function labelClassName(input: "name" | "email" | "message") : string {
		const common = ' flex absolute top-[10px] z-10 ml-2 font-normal transition-all ease-out duration-100 '
		const onFocus = ' top-[4px] left-[2px] text-[#565a66] text-xs ' 
		const onBlur = ' text-gray-500'
		const specific = {
			name: nameFocus || nameInputRef.current?.value  ? onFocus : onBlur, 
			email: emailFocus || emailInputRef.current?.value  ? onFocus : onBlur,
			message: messageFocus || messageInputRef.current?.value  ? onFocus : onBlur,
		}
		return  specific[input] + common 
	}

	function inputClassName(input: "nameOrEmail" | "message") : string {
		const common = `flex px-2 pt-4 rounded-sm border-2 border-white text-primary 
				focus:outline-none focus:ring-0 focus:border-[#565a66]  focus:border-2`
		const specific = {
			nameOrEmail: ' h-11',
			message:  ' h-20 ',
		}
		return specific[input] + common
	}

	window.scrollTo(0,0)

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
								<label 
									className={labelClassName("name")}
									onClick={nameLabelHandler}
								> 
									Name 
								</label>
								<input 
									ref={nameInputRef}
									type="text"
									name="user_name"
									className={inputClassName("nameOrEmail")}
									onFocus={()=>setNameFocus(true)}
									onBlur={()=>setNameFocus(false)}
								/>
							</div>
							<div className='flex relative flex-col'>
								<label 
									className={labelClassName("email")}
									onClick={emailLabelHandler}
								> 
									Email 
								</label>
								<input 
									ref={emailInputRef}
									type="email"
									name="user_email"
									className={inputClassName("nameOrEmail")}
									onFocus={()=>setEmailFocus(true)}
									onBlur={()=>setEmailFocus(false)}
								/>
							</div>

							<div className='flex relative flex-col'>
								<label 
									className={labelClassName("message")}
									onClick={messageLabelHandler}
								> 
									Message 
								</label>
								<textarea 
									ref={messageInputRef}
									name="message"
									className={inputClassName("message")}
									onFocus={()=>setMessageFocus(true)}
									onBlur={()=>setMessageFocus(false)}
								/>
							</div>
						<div className='h-12 flex flex-col items-center justify-center'>
							{(showReCaptcha && !submitted) && <h1> Click on the reCAPTCHA to send the email </h1>}
							{submitted && <h1 className='py-1 px-2 font-light '>Email Sent!</h1>}
							{!showReCaptcha && 
								<button
									className='py-1 px-2 bg-destructive hover:bg-[#C75D5D] w-[80px] h-fit 
										self-center rounded-full text-white cursor-pointer'
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
							</div>
						}
					</form>
				</div>
				</div>

			</AnimationWrapper>
		</div>
  );
}
