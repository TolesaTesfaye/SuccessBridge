import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { validatePassword, PasswordValidationResult } from '@utils/validation';

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  showRequirements = true,
}) => {
  const validation: PasswordValidationResult = validatePassword(password);

  const getStrengthColor = () => {
    switch (validation.strength) {
      case 'weak':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'strong':
        return 'bg-yellow-500';
      case 'very-strong':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthText = () => {
    switch (validation.strength) {
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'strong':
        return 'Strong';
      case 'very-strong':
        return 'Very Strong';
      default:
        return '';
    }
  };

  const requirements = [
    { text: 'At least 12 characters', met: password.length >= 12 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'One lowercase letter', met: /[a-z]/.test(password) },
    { text: 'One number', met: /[0-9]/.test(password) },
    { text: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
    { text: 'No common patterns', met: !/(123|abc|password|qwerty|admin)/i.test(password) },
  ];

  if (!password) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 dark:text-slate-400">Password Strength</span>
          <span className={`font-semibold ${
            validation.strength === 'weak' ? 'text-red-600' :
            validation.strength === 'medium' ? 'text-orange-600' :
            validation.strength === 'strong' ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {getStrengthText()}
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${validation.score}%` }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      {showRequirements && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Password Requirements:
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            {requirements.map((req, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-xs ${
                  req.met
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {req.met ? (
                  <Check className="w-3.5 h-3.5 flex-shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 flex-shrink-0" />
                )}
                <span>{req.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Messages */}
      {validation.errors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              {validation.errors.map((error, index) => (
                <p key={index} className="text-xs text-red-600 dark:text-red-400">
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
