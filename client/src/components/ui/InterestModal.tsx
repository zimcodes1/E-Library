import { useState, useEffect } from 'react';
import Button from './Button';
import { getCategories } from '../../utils/user/interests';

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

const InterestsModal = ({onClose, setInterests, currentInterests}:{onClose:()=>void, setInterests:(interests: string[])=>void, currentInterests: string[]}) => {
    const [availableOptions, setAvailableOptions] = useState<string[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>(currentInterests);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categories = await getCategories();
                if (categories && categories.length > 0) {
                    setAvailableOptions(categories.map(cat => cat.name));
                } else {
                    setAvailableOptions(["Technology", "Science", "Art", "Music", "Cooking", "Gaming", "Sports", "Travel", "Photography", "Reading"]);
                }
            } catch (error) {
                console.error('Failed to load categories:', error);
                setAvailableOptions(["Technology", "Science", "Art", "Music", "Cooking", "Gaming", "Sports", "Travel", "Photography", "Reading"]);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    const toggleInterest = (name: string) => {
        if (!selectedInterests.includes(name)) {
            setSelectedInterests([...selectedInterests, name]);
        } else {
            setSelectedInterests(selectedInterests.filter(i => i !== name));
        }
    };

    const handleSave = async () => {
        if (selectedInterests.length < 3) {
            alert('Please select at least 3 interests');
            return;
        }
        await setInterests(selectedInterests);
        onClose();
    };

    return (
            <div className="w-200 max-h-9/10 overflow-y-scroll no-scrollbar max-sm:w-9/10 bg-[#1a1b2e] border border-purple-500/30 text-gray-200 rounded-2xl shadow-2xl py-8 px-6 flex flex-col relative">
                <i onClick={onClose} className="fa fa-close text-xl text-gray-400 hover:text-gray-50 absolute top-4 right-4 cursor-pointer transition"></i>
                <h2 className="text-3xl max-sm:text-2xl font-bold gradient text-center">
                    <i className="fa fa-magic-wand-sparkles"></i> Your Interests
                </h2>
                <p className="text-sm text-gray-400 mt-3 text-center">Select topics you're interested in</p>
                
                {loading ? (
                    <div className="w-full h-40 flex items-center justify-center">
                        <p className="text-gray-400">Loading categories...</p>
                    </div>
                ) : availableOptions.length === 0 ? (
                    <div className="w-full h-40 flex items-center justify-center">
                        <p className="text-gray-400">No categories available</p>
                    </div>
                ) : (
                    <>
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
                    </>
                )}

               <Button text={`Save Interests ${selectedInterests.length < 3 ? `(${selectedInterests.length}/3)` : ''}`} styles='mt-6' onClick={handleSave} disabled={selectedInterests.length < 3}></Button>
            </div>
    );
}

export default InterestsModal;
