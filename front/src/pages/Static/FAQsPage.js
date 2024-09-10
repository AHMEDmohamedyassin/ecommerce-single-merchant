import React from 'react'
import 'scripts/faqsScript'

const FAQsPage = () => {
  return (
    <div className='custom-container flex flex-col gap-4'>

      
      {/* question */}
      <div>
        <div data-animation="question" className=' select-none bg-secondarybg flex justify-between items-center py-2 px-6 text-sm'>
          <p>ما هي المنتجات التي تبيعونها</p>
          <div data-animation="iconcontainer" className='flex items-center justify-center w-10 aspect-square rounded-full bg-secondarycolor text-secondarybg'>
            <span data-animation="inactiveicon" className="material-symbols-outlined text-3xl">add</span>
            <span data-animation="activeicon" className="hidden material-symbols-outlined">remove</span>
          </div>
        </div>
        
        <p data-animation="answer" className='hidden text-sm text-gray-500 px-6 py-4 bg-secondarybg shadow-sm'>نعم، هذا هو الموقع الرسمي لمجموعة "التوحيد والنور". نحن جزء من المؤسسة الأكبر وندير بشكل مباشر أربعة من فروعها، مع التزامنا بتوفير نفس الجودة والخدمة الممتازة التي تُعرف بها العلامة التجارية.</p>
      </div>

      {/* question */}
      <div>
        <div data-animation="question" className=' select-none bg-secondarybg flex justify-between items-center py-2 px-6 text-sm'>
          <p>ما هي المنتجات التي تبيعونها</p>
          <div data-animation="iconcontainer" className='flex items-center justify-center w-10 aspect-square rounded-full bg-secondarycolor text-secondarybg'>
            <span data-animation="inactiveicon" className="material-symbols-outlined text-3xl">add</span>
            <span data-animation="activeicon" className="hidden material-symbols-outlined">remove</span>
          </div>
        </div>
        
        <p data-animation="answer" className='hidden text-sm text-gray-500 px-6 py-4 bg-secondarybg shadow-sm'>نعم، هذا هو الموقع الرسمي لمجموعة "التوحيد والنور". نحن جزء من المؤسسة الأكبر وندير بشكل مباشر أربعة من فروعها، مع التزامنا بتوفير نفس الجودة والخدمة الممتازة التي تُعرف بها العلامة التجارية.</p>
      </div>

      {/* question */}
      <div>
        <div data-animation="question" className=' select-none bg-secondarybg flex justify-between items-center py-2 px-6 text-sm'>
          <p>ما هي المنتجات التي تبيعونها</p>
          <div data-animation="iconcontainer" className='flex items-center justify-center w-10 aspect-square rounded-full bg-secondarycolor text-secondarybg'>
            <span data-animation="inactiveicon" className="material-symbols-outlined text-3xl">add</span>
            <span data-animation="activeicon" className="hidden material-symbols-outlined">remove</span>
          </div>
        </div>
        
        <p data-animation="answer" className='hidden text-sm text-gray-500 px-6 py-4 bg-secondarybg shadow-sm'>نعم، هذا هو الموقع الرسمي لمجموعة "التوحيد والنور". نحن جزء من المؤسسة الأكبر وندير بشكل مباشر أربعة من فروعها، مع التزامنا بتوفير نفس الجودة والخدمة الممتازة التي تُعرف بها العلامة التجارية.</p>
      </div>


    </div>
  )
}

export default FAQsPage