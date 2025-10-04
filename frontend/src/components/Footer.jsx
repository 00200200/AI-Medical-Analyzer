import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className='w-full bg-gradient-to-r from-gray-900/40 via-gray-800/30 to-gray-900/40 backdrop-blur-md border-t border-white/10 py-6 px-4'>
			<div className='max-w-6xl mx-auto'>
				<div className='flex items-center justify-center space-x-3 text-amber-400/90 mb-3'>
					<FaExclamationTriangle className='text-lg' />
					<span className='text-sm font-semibold'>Medical Disclaimer</span>
				</div>
				<p className='text-center text-gray-300/80 text-sm leading-relaxed max-w-4xl mx-auto'>
					This application is for educational and demonstration purposes only. It does not replace professional medical
					consultation. Always consult results with a doctor.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
