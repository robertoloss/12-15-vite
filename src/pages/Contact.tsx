import { useRef } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import { usePage } from '@/utils/my-store';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
	const nameInputRef = useRef<HTMLInputElement>(null)
	const emailInputRef = useRef<HTMLInputElement>(null)
	const messageInputRef = useRef<HTMLTextAreaElement>(null)
	const [capVal, setCapVal] = useState<string | null>(null)
	const [submitted, setSubmitted] = useState(false)
	const [nameFocus, setNameFocus] = useState(false)
	const [emailFocus, setEmailFocus] = useState(false)
	const [messageFocus, setMessageFocus] = useState(false)

	const { pageOpen, setPageOpen } = usePage()
	const location = useLocation()
	
	useEffect(()=>{
		setPageOpen(true)
	},[setPageOpen,location])

  const sendEmail = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
  };
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
		const common = 'flex px-2 pt-4 rounded-sm border-2 border-white focus:outline-none focus:ring-0 focus:border-[#565a66]  focus:border-2'
		const specific = {
			nameOrEmail: ' h-11',
			message:  ' h-20 ',
		}
		return specific[input] + common
	}


  return (<div className='min-h-screen'>
		{pageOpen && 
			<div className='flex flex-col w-full items-center py-10 gap-y-10 
				sm:py-14 px-6 sm:gap-y-10 min-h-[calc(100vh-290px)]'>
				<h1 className='text-4xl font-bold'>
					Contact
				</h1>
				<p className='w-full max-w-[400px] text-center text-lg'>
					If you'd like to get in touch, please send a quick message along with your name and email address
				</p>
					<div className='flex flex-col w-full max-w-[400px]'>
						<form ref={form} onSubmit={sendEmail} className='flex flex-col w-full gap-y-4'>

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


							{!capVal && 
							<>
								<ReCAPTCHA 
									sitekey={process.env.CAPTCHA_SITE_KEY!}
									onChange={(v)=>setCapVal(v)}
									className='flex z-20 self-center'
								/>
								</>
							}
							{(capVal && !submitted) && <input 
								type="submit" 
								value="Send" 
								disabled={!capVal}
								className='
									mt-10 py-1 px-2 bg-sky-600 hover:bg-sky-700 w-[80px] 
									self-center rounded-full text-white cursor-pointer
								'
							/>}
							{submitted && <h1 className='mt-10 py-1 px-2 self-center font-semibold'>Sent!</h1>}
						</form>
					</div>
			</div>
		}
		</div>
  );
}
