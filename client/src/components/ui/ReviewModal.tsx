import Button from "./Button"

function ReviewModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="w-100 h-fit max-sm:w-9/10 bg-[#0d0f21] border border-gray-600 text-gray-200 rounded-2xl shadow-md shadow-[#0d0a1a6f] py-10 px-5 flex flex-col relative">
            <i onClick={onClose} className="fa fa-close text-xl text-gray-50 absolute top-5 right-5 cursor-pointer"></i>
            <h2 className="font-semibold text-2xl text-gray-400 mx-auto mt-5">Book Reviews</h2>
            <p className="text-sm text-gray-300 mt-2 text-center">Write your out your review here. Every other information is filled out automatically. </p>
            <textarea name="" placeholder="Write your review here..." className="resize-none p-2 text-sm w-full h-40 mt-3 ring-0 outline-0 rounded-2xl border bg-[#4857605a] border-gray-700"></textarea>
            <Button text='Submit Selection' styles='mt-10' onClick={()=>{onClose()}}></Button>
        </div>
    )
}

export default ReviewModal