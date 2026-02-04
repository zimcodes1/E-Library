interface TabProps {
    tabs: string[];
    activeTab: number;
    onTabChange: (index: number) => void;
}

function Tabs({ tabs, activeTab, onTabChange }: TabProps) {
    return (
        <div className="flex gap-2 border-b border-gray-700 mb-6">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => onTabChange(index)}
                    className={`px-6 py-3 text-sm font-medium transition-all ${
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
