import React, { useState } from "react"
import "./report.css"
import emailjs from 'emailjs-com';
import { sendForm } from "emailjs-com";

const ContactFrom = () => 
{


  const [allValue, setAllValue] = useState({
   from_name:'',
    to_name: '',
    message: '',
    reply_to: '',
})
const [send,notSend]=useState(false);
  const formSubmit = (e) => {
    e.preventDefault()
  
    
  notSend(!send);
emailjs.sendForm('service_umwrb3d',"template_f20ifle", e.target, 'Jqfe_1gmMdloHsbug')
    .then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
 
  }
    const handleClick=(e)=>{
  setAllValue({ ...allValue, [e.target.name]: e.target.value })
  }
  return (
    <>
      <section className='contact-form'>
      <h1 class="heading">
            <span>C</span>
            <span>O</span>
            <span>N</span>
            <span>T</span>
             <span>A</span>
            <span>C</span>
            <span>T</span>
            

        </h1>
       
        <div className='container-form'>
          <div className='main-content'>

            <p style={{color:'white',fontSize:'30px'}}>Fill out the form below If you face any issue, we will get back you soon.</p>

            <form  onSubmit={formSubmit} >
              <div className='grid1'>
                <div className='input'>
                  <span>
                    First Name <label>*</label>
                  </span>
                  <input type='text' name='to_name' value={allValue.to_name} onChange={handleClick} required />
                </div>
                <div className='input'>
                  <span>
                    Last Name <label>*</label>
                  </span>
                  <input type='text' name='from_name' value={allValue.from_name} onChange={handleClick} required />
                </div>
               
                <div className='input'>
                  <span>
                    Email <label>*</label>
                  </span>
                  <input type='email' name='reply_to' value={allValue.reply_to} onChange={handleClick} required />
                </div>
              
                </div>
          
              <div className='input inputlast'>
                <span>
                  Write Your Message <label>*</label>
                </span>
                <textarea  name='message'  cols='30' rows='10'value={allValue.message} onChange={handleClick}></textarea>
              </div>
            
              <button className='primary-btn'>Submit Now</button>
            </form>
          </div>


         
      
        </div>
    
      </section>
      </>
  )
}
export default ContactFrom;