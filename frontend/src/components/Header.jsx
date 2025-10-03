import React, { useState } from 'react';
import { FaBars, FaFlask, FaImage } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Header = ({ navigateTo, activeScreen }) => {
	const [menuOpen, setMenuOpen] = useState(false);

	const menuItems = [
		{ name: 'BloodTestAnalyzer', key: 'blood', icon: <FaFlask /> },
		{ name: 'ImageAnalyzer', key: 'image', icon: <FaImage /> },
	];

	const activeItem = menuItems.find(item => item.key === activeScreen);

	return (
		<header
			className="
				w-full 
				bg-gradient-to-r from-gray-900/40 via-gray-800/30 to-gray-900/40
				backdrop-blur-md
				text-white 
				flex items-center justify-start 
				px-24 py-4 
				fixed top-0 left-0 
				z-50 
				shadow-xl
			"
		>
			<div
				className="
					absolute left-5 w-10 h-10 
					rounded-xl 
					bg-white/10 
					backdrop-blur-sm 
					flex items-center justify-center 
					cursor-pointer 
					transition-all duration-300 
					hover:bg-white/20 
					hover:scale-110 
					hover:shadow-lg hover:shadow-purple-500/25
				"
				onClick={() => setMenuOpen(!menuOpen)}
			>
				<FaBars size={24} className="text-white" />
			</div>

			<h1 className="text-xl m-0 font-sans flex items-center text-white">
				{activeItem.icon}
				<span className="ml-2.5">
					{activeItem.key === 'blood' ? 'BloodTestAnalyzer' : 'ImageAnalyzer'}
				</span>
			</h1>

			{menuOpen && (
				<div
					className="
						absolute top-16 left-5 
						bg-white/20 
						backdrop-blur-md 
						rounded-2xl 
						shadow-2xl 
						p-3 
						flex flex-col min-w-52 
						border border-purple-200/30
					"
				>
					{menuItems.map(item => (
						<button
							key={item.key}
							className={`
								bg-transparent border-none p-3 
								cursor-pointer text-left 
								flex items-center gap-3 
								rounded-xl 
								transition-all duration-300
								${
									activeScreen === item.key
										? 'font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/25'
										: 'font-normal text-gray-900 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 hover:text-purple-700'
								}
							`}
							onClick={() => {
								navigateTo(item.key);
								setMenuOpen(false);
							}}
						>
							{item.icon}
							{item.name}
						</button>
					))}
				</div>
			)}
		</header>
	);
};

Header.propTypes = {
	navigateTo: PropTypes.func.isRequired,
	activeScreen: PropTypes.string.isRequired,
};

export default Header;
