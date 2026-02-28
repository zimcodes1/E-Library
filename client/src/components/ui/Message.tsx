const Message = ({type, text}:{type:string, text:string}) => {
	return (
		<div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-${type === 'success' ? 'green-500/90' : 'red-500 '} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in`}>
			<i className={`fa fa-${type === 'success' ? 'check-circle' : 'times-circle'}`}></i>
			<span>{text}</span>
		</div>
	);
};


export default Message