import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import CustomSelect from "../components/ui/CustomSelect"
import ShelveItem from "../components/ShelveItem"
import Preloader from "../components/ui/Preloader"
import Message from "../components/ui/Message"
import { useEffect, useState } from "react"
import { getUserShelves, removeFromShelf } from "../utils/books"

const Shelve = () => {
    useEffect(()=>{document.title = 'Your Shelve | Libronet'}, [])
    const [shelveItems, setShelveItems] = useState<any[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

    useEffect(() => {
        loadShelveItems();
    }, [filter]);

    const loadShelveItems = async () => {
        try {
            setLoading(true);
            const type = filter === 'all' ? undefined : filter;
            const items = await getUserShelves(type);
            setShelveItems(items);
        } catch (err) {
            console.error('Failed to load shelve items:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (shelveId: number) => {
        try {
            const removedItem = shelveItems.find(item => item.id === shelveId);
            await removeFromShelf(shelveId);
            setShelveItems(shelveItems.filter(item => item.id !== shelveId));
            showMessage('success', `${removedItem?.book_details?.title || 'Book'} was removed from your shelve`);
        } catch (err) {
            console.error('Failed to remove item:', err);
            showMessage('error', 'Failed to remove item. Please try again.');
        }
    };

    const showMessage = (type: string, text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };
    return (
        <div className="w-full flex justify-end items-center bgImage min-h-screen pb-10 max-sm:pb-25">
            <Preloader isLoading={loading} />
            {message && <Message type={message.type} text={message.text} />}
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 max-[900px]:w-7/8 max-sm:w-full min-h-screen flex flex-col px-10 max-[900px]:px-5 max-sm:px-3 pt-5 relative">
                {/* Topbar component for Search Feature, Language Switch ... */}
                <TopBar />
                {/* Main Contents */}
                <div className="w-full h-full flex mt-15 max-sm:mt-3 flex-col">
                    <span className="flex justify-start max-sm:justify-center items-center">
                        <h2 className="text-lg max-sm:font-normal font-semibold text-gray-300">Your Shelve ({shelveItems.length})</h2>
                        <span className="flex h-9 min-w-25 px-2 ml-10 rounded-4xl bg-[#4857605a] justify-center items-center border border-gray-700 shadow cursor-pointer">
                            <CustomSelect 
                                defaultValue="All Books" 
                                options={[
                                    {value:'all', label:'All Books'},
                                    {value:'favorite', label:'Favorites'}, 
                                    {value:'bookmark', label:'Bookmarks'}
                                ]}
                                onChange={(val) => setFilter(val)}
                            ></CustomSelect>
                        </span>
                    </span>
                    {/* Shelve Container */}
                    <div className="w-full h-fit flex justify-start items-center flex-wrap max-sm:flex-col mt-5 text-sm gap-10 max-[900px]:gap-2 max-sm:gap-2">
                        {loading ? (
                            <div className="w-full flex justify-center items-center py-20">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-gray-400">Loading your shelve...</p>
                                </div>
                            </div>
                        ) : shelveItems.length === 0 ? (
                            <div className="w-full flex flex-col justify-center items-center py-20">
                                <i className="fa fa-book-open text-6xl text-gray-600 mb-4"></i>
                                <p className="text-gray-400 text-xl">No items in your shelve yet</p>
                                <p className="text-gray-500 text-sm mt-2">Start adding books to your favorites or bookmarks!</p>
                            </div>
                        ) : (
                            shelveItems.map((item) => (
                                <ShelveItem key={item.id} shelveItem={item} onRemove={handleRemove} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shelve