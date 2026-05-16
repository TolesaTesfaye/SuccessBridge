import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Clock, AlertTriangle } from 'lucide-react';
import { sessionManager } from '@utils/sessionManager';

interface SessionTimeoutWarningProps {
  isOpen: boolean;
  onExtend: () => void;
  onLogout: () => void;
}

export const SessionTimeoutWarning: React.FC<SessionTimeoutWarningProps> = ({
  isOpen,
  onExtend,
  onLogout,
}) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const time = sessionManager.getRemainingTime();
      setRemainingTime(time);

      if (time <= 0) {
        clearInterval(interval);
        onLogout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, onLogout]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onExtend}
      title="Session Expiring Soon"
      size="sm"
    >
      <div className="space-y-6">
        {/* Warning Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Your session is about to expire
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            For your security, you'll be automatically logged out due to inactivity.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            <div className="text-center">
              <p className="text-3xl font-black text-slate-900 dark:text-white">
                {formatTime(remainingTime)}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Time remaining
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={onLogout}
            className="border-slate-300 dark:border-slate-600"
          >
            Logout Now
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={onExtend}
          >
            Stay Logged In
          </Button>
        </div>

        {/* Info */}
        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
          Click "Stay Logged In" to continue your session
        </p>
      </div>
    </Modal>
  );
};
