'use client';

import React, { useState } from 'react';
import { FaRedo } from 'react-icons/fa';

const EvaluationCard: React.FC = () => {
	const [activeTab, setActiveTab] = useState<'Metrics' | 'AI Feedback'>('Metrics');
	const [AIFeedback, setAIFeedback] = useState<string>('AI Feedback coming soon...');
	
	const metrics = {
		"Architecture Clarity": 4,
		"Scalability": 3,
		"Data Consistency": 2,
		"Fault Tolerance": 1,
		"Performance": 3
	};

	const renderRatingCircles = (score: number) => {
		return (
			<div className="flex gap-1">
				{[...Array(5)].map((_, index) => (
					<div
						key={index}
						className={`w-3 h-3 rounded-full ${
							index < score ? 'bg-primary-pure' : 'bg-gray-200'
						}`}
					/>
				))}
			</div>
		);
	};

	return(
		<div className="mt-2 rounded-lg border border-gray-200">
			<div className="rounded-t-lg bg-light-medium text-dark-medium p-4 flex items-center justify-between">
				<span>Progress Tracker</span>
				<button className="text-gray-500">
					<FaRedo />
				</button>
			</div>
			{/* Tab Toggle */}
			<div className="flex border-b rounded-lg border-gray-200 bg-gray-50 gap-2 mt-2 mx-3 p-1">
				<button
					className={`flex-1 p-1 text-sm font-semibold transition-colors duration-150 rounded-lg ${
						activeTab === 'Metrics' 
							? 'bg-white text-dark-pure shadow-sm' 
							: 'text-gray-600 hover:text-gray-800'
					}`}
					onClick={() => setActiveTab('Metrics')}
				>
					Metrics
				</button>
				<button
					className={`flex-1 p-1 text-sm font-semibold transition-colors duration-150 rounded-lg ${
						activeTab === 'AI Feedback' 
							? 'bg-white text-dark-pure shadow-sm' 
							: 'text-gray-600 hover:text-gray-800'
					}`}
					onClick={() => setActiveTab('AI Feedback')}
				>
					AI Feedback
				</button>
			</div>
			{/* Tab Content */}
			<div>
				{activeTab === 'Metrics' ? (
					Object.entries(metrics).map(([metric, score]) => (
						<div key={metric} className="flex justify-between items-center p-2">
							<div>{metric}</div>
							{renderRatingCircles(score)}
						</div>
					))
				) : (
					<div className="p-4 text-gray-500 text-center">{AIFeedback}</div>
				)}
			</div>
		</div>
	);
};

export default EvaluationCard;