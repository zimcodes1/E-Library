import Review from "../ui/Review";
function Reviews() {
    return (
        <div className="w-[80%] max-[900px]:w-full max-sm:w-full h-fit flex flex-col mx-auto mt-20 max-[900px]:mt-10 flex-wrap">
            <h1 className="text-3xl max-[900px]:text-2xl text-gray-400 font-semibold mb-5 text-center">Reviews</h1>
            {/* Reviews List */}
            <div className="w-full flex max-sm:flex-col justify-evenly items-center px-5">
                <Review text="Hi, i really enjoyed using Libronet, the app's interface is intuitive and the user experience is excellent. The Premium Subscription howerver sucks!" userImage="/images/avatar1.png" userName="Mercy"></Review>
                <Review text="Hi, i really enjoyed using Libronet, the app's interface is intuitive and the user experience is excellent. The Premium Subscription howerver sucks!" userImage="/images/avatar2.png" userName="Precious"></Review>
                <Review text="Hi, i really enjoyed using Libronet, the app's interface is intuitive and the user experience is excellent. The Premium Subscription howerver sucks!" userImage="/images/avatar3.png" userName="Miracle"></Review>
            </div>
        </div>
    )
}

export default Reviews;