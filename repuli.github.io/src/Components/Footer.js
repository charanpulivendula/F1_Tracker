import React from 'react'
import Mail from '../Assets/mail.png';
const Footer = () => {
  return (
    <div className='footer xl:ml-48 xl:mr-48 xl:border-t-4 xl:mt-36 xl:mb-24 max-sm:pl-5 max-sm:pr-5 max-sm:mb-16'>
        <div className='mt-20 xl:flex xl:space-x-5 max-sm:flex-col'>
            <div className='location flex-col xl:w-1/2'>
                <div className='xl:text-4xl max-sm:text-3xl font-bold text-left'>
                    Location
                </div>
                <br/>
                <br/>
                <div className='text-xl max-sm:text-lg text-left'>
                    Multidisciplinary Engineering and Sciences Hall (MESH)
                </div>
                <br/>
                <div className='text-xl max-sm:text-lg text-left'>
                    Room 080, 2401 N Milo B Sampson Ln, Bloomington, IN 47408
                </div>
                <br/>
                <div className='text-xl max-sm:text-lg text-left'>
                    Please email Prof. Lantao Liu if you are interested in visiting the lab.
                </div>
                <br/>
            </div>
            <div className='contactus  xl:w-1/2'>
                <div className='text-4xl font-bold max-sm:text-3xl text-left'>
                    Contact US
                </div>
                <br/>
                <br/>
                <div className='flex space-x-5'>
                    <img className='h-5 w-6 mt-2' src={Mail} width={40} height={10} alt=''/>
                    <div className='text-xl'>dpush@iu.edu</div>
                </div>
                <br/>
                <div className='flex space-x-5'>
                    <img className='h-5 w-6 mt-2' src={Mail} width={40} height={10} alt=''/>
                    <div className='text-xl'>alimaa@iu.edu</div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Footer;