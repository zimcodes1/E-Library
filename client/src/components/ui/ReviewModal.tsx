import { useState } from "react"
import Button from "./Button"

interface ReviewModalProps {
    onClose: () => void;
    onSubmit: (rating: number, title: string, content: string) => void;
}

function ReviewModal({ onClose, onSubmit }: ReviewModalProps) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const MAX_CHARS = 500;

    const handleSubmit = () => {
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        if (content.trim().length === 0) {
            alert('Please write a review');
            return;
        }
        onSubmit(rating, title, content);
        onClose();
    };

    return (
        <div className="w-120 h-fit max-sm:w-9/10 bg-[#1a1b2e] border border-purple-500/30 text-gray-200 rounded-2xl shadow-2xl py-8 px-6 flex flex-col relative">
            <i onClick={onClose} className="fa fa-close text-xl text-gray-400 hover:text-gray-50 absolute top-4 right-4 cursor-pointer transition"></i>
            <h2 className="font-bold text-3xl max-sm:text-2xl gradient mx-auto">Rate & Review</h2>
            <p className="text-sm text-gray-400 mt-3 text-center">Share your thoughts about this book</p>
            
            <div className="flex flex-col items-center my-6">
                <small className="text-gray-400 mb-3">Your Rating</small>
                <span className="flex gap-2 text-3xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <i
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            className={`fa fa-star cursor-pointer transition-all ${
                                star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-600'
                            } hover:scale-110`}
                        ></i>
                    ))}
                </span>
                {rating > 0 && <p className="text-sm text-purple-400 mt-2">{rating} out of 5 stars</p>}
            </div>

            <input
                type="text"
                placeholder="Review title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                className="p-3 text-sm w-full ring-0 outline-0 rounded-xl border bg-[#0d0f21] border-gray-700 focus:border-purple-500 transition text-gray-200 placeholder-gray-500 mb-3"
            />

            <textarea 
                placeholder="Write your review here..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={MAX_CHARS}
                className="resize-none p-4 text-sm w-full h-40 ring-0 outline-0 rounded-xl border bg-[#0d0f21] border-gray-700 focus:border-purple-500 transition text-gray-200 placeholder-gray-500"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1 text-right">{content.length}/{MAX_CHARS} characters</p>
            
            <Button text='Submit Review' styles='mt-6' onClick={handleSubmit}></Button>
        </div>
    )
}

export default ReviewModal