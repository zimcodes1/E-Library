const Message = ({type, text}:{type:string, text:string}) => {
	return (
		<div className={`fixed top-5 left-1/2 -translate-x-1/2 z-100 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in ${type === 'success' ? 'bg-green-500/90' : 'bg-red-500'}`}>
			<i className={`fa fa-${type === 'success' ? 'check-circle' : 'times-circle'}`}></i>
			<span>{text}</span>
		</div>
	);
};


export default Message