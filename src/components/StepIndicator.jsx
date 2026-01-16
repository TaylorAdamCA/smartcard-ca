import { Check } from 'lucide-react';
import './StepIndicator.css';

const STEPS = [
    { id: 1, label: 'Upload' },
    { id: 2, label: 'Verify' },
    { id: 3, label: 'Select Card' },
    { id: 4, label: 'Results' },
];

export function StepIndicator({ currentStep }) {
    return (
        <div className="step-indicator">
            {STEPS.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const isLast = index === STEPS.length - 1;

                return (
                    <div key={step.id} className="step-item">
                        <div className="step-circle-container">
                            <div
                                className={`step-circle ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                            >
                                {isCompleted ? (
                                    <Check size={14} strokeWidth={3} />
                                ) : (
                                    <span>{step.id}</span>
                                )}
                            </div>
                            {!isLast && (
                                <div className={`step-line ${isCompleted ? 'completed' : ''}`} />
                            )}
                        </div>
                        <span className={`step-label ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}>
                            {step.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
