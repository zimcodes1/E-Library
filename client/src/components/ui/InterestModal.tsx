import { useState } from 'react';
import Button from './Button';
// Simplified Interest component that accepts a click handler and an 'active' state
function Interest({ InterestName, onClick, isSelected }: { InterestName: string, onClick: () => void, isSelected?: boolean }) {
    return (
        <span
            onClick={onClick}
            className={`w-auto p-2 px-5 rounded-2xl text-sm cursor-pointer transition-all duration-200 ${isSelected
                ? "bg-blue-600 text-white" // Style for when selected
                : "bg-gray-200 text-gray-900 hover:bg-gray-300" // Style for available
                }`}
        >
            {InterestName}
        </span>
    );
}

const InterestsModal = ({onClose, setInterests}:{onClose:()=>void, setInterests:React.Dispatch<React.SetStateAction<string[]>>}) => {
    // 1. Data source for all possible interests
    const availableOptions = ["Technology", "Science", "Art", "Music", "Cooking", "Gaming"];

    // 2. State to track which ones the user has clicked
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    // 3. Logic to add an interest (and prevent duplicates)
    const toggleInterest = (name: string) => {
        if (!selectedInterests.includes(name)) {
            setSelectedInterests([...selectedInterests, name]);
            setInterests([...selectedInterests, name])
        } else {
            // Optional: Remove if clicked again
            setSelectedInterests(selectedInterests.filter(i => i !== name));
            setInterests(selectedInterests.filter(i => i !== name))
        }
    };

    return (
            <div className="w-100 h-8/10 bg-[#0d0f21] border border-gray-600 text-gray-200 rounded-2xl shadow-md shadow-[#0d0a1a6f] py-10 px-5 flex flex-col relative">
                <i onClick={onClose} className="fa fa-close text-xl text-gray-50 absolute top-5 right-5 cursor-pointer"></i>
                <h2 className="text-2xl font-semibold text-center">
                    <i className="fa fa-magic-wand-sparkles"></i> Interests
                </h2>
                <p className="text-sm text-gray-300 mt-2 text-center">Click on any interest to select it</p>
                {/* Available Pool */}
                <div className="w-full h-fit mt-5 flex justify-start flex-wrap gap-2">
                    {availableOptions.map((item) => (
                        <Interest
                            key={item}
                            InterestName={item}
                            onClick={() => toggleInterest(item)}
                            isSelected={selectedInterests.includes(item)}
                        />
                    ))}
                </div>

                <p className="text-sm text-gray-300 mt-7 text-center">Selected Interests</p>

                {/* Selected Area - React renders this based on the state array */}
                <div className="w-full h-fit mt-5 flex justify-start flex-wrap gap-2 min-h-12.5 border-t border-gray-800 pt-4">
                    {selectedInterests.length === 0 && (
                        <p className="text-gray-500 italic text-xs">No interests selected yet...</p>
                    )}
                    {selectedInterests.map((item) => (
                        <Interest
                            key={item}
                            InterestName={item}
                            onClick={() => toggleInterest(item)}
                            isSelected={true}
                        />
                    ))}
                </div>
               <Button text='Submit Selection' styles='mt-10' onClick={()=>{onClose()}}></Button>
            </div>
    );
}

export default InterestsModal;