import React from 'react';
import { FaMicroscope, FaFlask, FaArrowRight, FaStethoscope, FaXRay } from 'react-icons/fa';

const LandingPage = ({ navigateTo }) => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
			{/* Background Effects */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl'></div>
				<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl'></div>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl'></div>
			</div>

			<div className='relative z-10 max-w-6xl mx-auto'>
				{/* Header */}
				<div className='text-center mb-16'>
					<h1 className='text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6'>
						Medical Analyzer
					</h1>
					<p className='text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed'>
						Advanced medical analysis using artificial intelligence to interpret blood tests and medical images
					</p>
				</div>

				{/* Main Cards */}
				<div className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
					{/* Blood Analysis Card */}
					<div className='group cursor-pointer' onClick={() => navigateTo('blood')}>
						<div className='relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20'>
							{/* Card Header */}
							<div className='flex items-center justify-between mb-6'>
								<div className='flex items-center space-x-4'>
									<div className='p-4 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl border border-red-400/30'>
										<FaFlask className='text-3xl text-red-400' />
									</div>
									<div>
										<h2 className='text-2xl font-bold text-white mb-2'>Blood Test Analysis</h2>
										<p className='text-gray-400'>Laboratory results interpretation</p>
									</div>
								</div>
								<FaArrowRight className='text-2xl text-purple-400 group-hover:translate-x-2 transition-transform duration-300' />
							</div>

							{/* Card Content */}
							<div className='space-y-4 mb-6'>
								<div className='flex items-center space-x-3 text-gray-300'>
									<div className='w-2 h-2 bg-red-400 rounded-full'></div>
									<span>Complete blood count</span>
								</div>
							</div>

							{/* Card Footer */}
							<div className='pt-4 border-t border-white/10'>
								<div className='flex items-center justify-between'>
									<span className='text-sm text-gray-400'>Click to start</span>
									<div className='flex items-center space-x-2 text-purple-400'>
										<FaStethoscope className='text-lg' />
										<span className='text-sm font-medium'>AI Analysis</span>
									</div>
								</div>
							</div>

							{/* Hover Effect Overlay */}
							<div className='absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
						</div>
					</div>

					{/* Image Analysis Card */}
					<div className='group cursor-pointer' onClick={() => navigateTo('image')}>
						<div className='relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20'>
							{/* Card Header */}
							<div className='flex items-center justify-between mb-6'>
								<div className='flex items-center space-x-4'>
									<div className='p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-400/30'>
										<FaXRay className='text-3xl text-blue-400' />
									</div>
									<div>
										<h2 className='text-2xl font-bold text-white mb-2'>Image Analysis</h2>
										<p className='text-gray-400'>Medical image interpretation</p>
									</div>
								</div>
								<FaArrowRight className='text-2xl text-blue-400 group-hover:translate-x-2 transition-transform duration-300' />
							</div>

							{/* Card Content */}
							<div className='space-y-4 mb-6'>
								<div className='flex items-center space-x-3 text-gray-300'>
									<div className='w-2 h-2 bg-blue-400 rounded-full'></div>
									<span>X-ray images</span>
								</div>
							</div>

							{/* Card Footer */}
							<div className='pt-4 border-t border-white/10'>
								<div className='flex items-center justify-between'>
									<span className='text-sm text-gray-400'>Click to start</span>
									<div className='flex items-center space-x-2 text-blue-400'>
										<FaMicroscope className='text-lg' />
										<span className='text-sm font-medium'>AI Vision</span>
									</div>
								</div>
							</div>

							{/* Hover Effect Overlay */}
							<div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
