interface TabProps {
    tabs: string[];
    activeTab: number;
    onTabChange: (index: number) => void;
}

function Tabs({ tabs, activeTab, onTabChange }: TabProps) {
    return (
        <div className="flex max-sm:justify-between gap-2 border-b border-gray-700 mb-6">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => onTabChange(index)}
                    className={`px-6 max-sm:px-0 max-sm:w-auto py-3 text-sm font-medium transition-all ${
                        activeTab === index
                            ? 'text-purple-400 border-b-2 border-purple-400'
                            : 'text-gray-400 hover:text-gray-300'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}

export default Tabs
