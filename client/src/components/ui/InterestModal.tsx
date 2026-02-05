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

const InterestsModal = ({onClose, setInterests, currentInterests}:{onClose:()=>void, setInterests:React.Dispatch<React.SetStateAction<string[]>>, currentInterests: string[]}) => {
    const availableOptions = ["Technology", "Science", "Art", "Music", "Cooking", "Gaming", "Sports", "Travel", "Photography", "Reading"];
    const [selectedInterests, setSelectedInterests] = useState<string[]>(currentInterests);

    const toggleInterest = (name: string) => {
        if (!selectedInterests.includes(name)) {
            setSelectedInterests([...selectedInterests, name]);
        } else {
            setSelectedInterests(selectedInterests.filter(i => i !== name));
        }
    };

    const handleSave = () => {
        setInterests(selectedInterests);
        onClose();
    };

    return (
            <div className="w-100 h-fit max-sm:w-9/10 bg-[#1a1b2e] border border-purple-500/30 text-gray-200 rounded-2xl shadow-2xl py-8 px-6 flex flex-col relative">
                <i onClick={onClose} className="fa fa-close text-xl text-gray-400 hover:text-gray-50 absolute top-4 right-4 cursor-pointer transition"></i>
                <h2 className="text-3xl max-sm:text-2xl font-bold gradient text-center">
                    <i className="fa fa-magic-wand-sparkles"></i> Your Interests
                </h2>
                <p className="text-sm text-gray-400 mt-3 text-center">Select topics you're interested in</p>
                
                <div className="w-full h-fit mt-6 flex justify-center flex-wrap gap-3">
                    {availableOptions.map((item) => (
                        <Interest
                            key={item}
                            InterestName={item}
                            onClick={() => toggleInterest(item)}
                            isSelected={selectedInterests.includes(item)}
                        />
                    ))}
                </div>

                {selectedInterests.length > 0 && (
                    <div className="w-full mt-6 p-4 rounded-xl bg-[#0d0f21] border border-gray-700">
                        <p className="text-sm text-gray-400 mb-3 text-center">Selected ({selectedInterests.length})</p>
                        <div className="flex justify-center flex-wrap gap-2">
                            {selectedInterests.map((item) => (
                                <span key={item} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center gap-2">
                                    {item}
                                    <i onClick={() => toggleInterest(item)} className="fa fa-times cursor-pointer hover:text-purple-100"></i>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

               <Button text='Save Interests' styles='mt-6' onClick={handleSave}></Button>
            </div>
    );
}

export default InterestsModal;