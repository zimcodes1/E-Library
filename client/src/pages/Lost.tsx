import Button from "../components/ui/Button"

function Lost(){
    return(
        <div className="w-full h-screen bgImage flex flex-col justify-center items-center">
            <h1 className="text-5xl text-gray-300 font-bold max-sm:text-3xl">404 Not Found</h1>
            <p className="text-gray-400 mt-2 max-sm:text-xs">Looks like you've lost your way, Let's get you back.</p>
            <Button onClick={()=>{
                window.history.back();
            }} text="Back" styles='mt-2'></Button>
        </div>
    )
}

export default Lost