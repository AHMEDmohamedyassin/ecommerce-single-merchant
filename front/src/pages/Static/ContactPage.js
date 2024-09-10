import React from 'react'

const ContactPage = () => {
  return (
    <div className='custom-container'>
      
      <div className='grid sm:grid-cols-2 gap-10'>

        {/* contact form  */}
        <form className='flex flex-col gap-4'>
          
          <p className='font-bold text-lg'>اترك لنا رسالة</p>

          {/* name input */}
          <div className='custom-inputcontainer2'>
            <label>الاسم</label>
            <input />
          </div>
          
          {/* email input */}
          <div className='custom-inputcontainer2'>
            <label>بريدك الاليكتروني</label>
            <input />
          </div>
          
          {/* phone input */}
          <div className='custom-inputcontainer2'>
            <label>رقم الهاتف</label>
            <input />
          </div>
          
          {/* msg input */}
          <div className='custom-inputcontainer2'>
            <label>رسالتك</label>
            <textarea rows={10} />
          </div>


          <button className='custom-button py-2 border-black hover:border-secondarycolor hover:bg-secondarycolor hover:text-white font-semibold'>إرسال</button>

        </form>




        {/* contact details  */}
        <div>

          <p className='font-bold text-lg'>طرق التواصل</p>
          
          <div className='flex flex-col gap-6 mt-6 text-xs text-gray-500'>


            <p>نحن نحب أن نسمع منكم على خدمة العملاء لدينا، أو المنتجات، أو الموقع الإلكتروني أو أي موضوعات تريد مشاركتها معنا. سيكون موضع تقدير تعليقاتك واقتراحاتك. يرجى ملء النموذج أدناه.</p>
          
            <p className='flex items-center gap-2'>
              <span className="material-symbols-outlined text-xl">home</span>
              <span>35 ش افريقيا - امتداد مصطفي النحاس - المنطقة التاسعة - مدينة نصر</span>
            </p>
          
            <p className='flex items-center gap-2'>
              <span className="material-symbols-outlined text-xl">home</span>
              <span>35 ش افريقيا - امتداد مصطفي النحاس - المنطقة التاسعة - مدينة نصر</span>
            </p>
          
            <p className='flex items-center gap-2'>
              <span className="material-symbols-outlined text-xl">home</span>
              <span>35 ش افريقيا - امتداد مصطفي النحاس - المنطقة التاسعة - مدينة نصر</span>
            </p>
          
            <p className='flex items-center gap-2'>
              <span className="material-symbols-outlined text-xl">home</span>
              <span>35 ش افريقيا - امتداد مصطفي النحاس - المنطقة التاسعة - مدينة نصر</span>
            </p>


          </div>

        </div>




      </div>

    </div>
  )
}

export default ContactPage