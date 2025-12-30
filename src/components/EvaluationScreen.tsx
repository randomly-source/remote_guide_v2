import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

type EvaluationResult = 'all-success' | 'partial-success' | 'no-success';

interface EvaluationScreenProps {
  hasValidatedOnce?: boolean;
  onComplete: (recheckTasks?: MilestoneId[], isFullSuccess?: boolean) => void;
  onSeeTasks?: () => void;
}

type MilestoneId = 'living-room' | 'hub' | 'streaming' | 'bedroom';

const systemsToCheck = [
  { id: 'living-room', name: 'Living Room Meter' },
  { id: 'hub', name: 'The Hub' },
  { id: 'streaming', name: 'Streaming Meter' },
  { id: 'bedroom', name: 'Bedroom TV Meter' }
];

export function EvaluationScreen({ hasValidatedOnce = false, onComplete, onSeeTasks }: EvaluationScreenProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [recheckTasks, setRecheckTasks] = useState<MilestoneId[]>([]);
  const [currentSystemIndex, setCurrentSystemIndex] = useState(0);
  const [checkedSystems, setCheckedSystems] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Animate through systems being checked
    const systemInterval = setInterval(() => {
      setCurrentSystemIndex(prev => {
        const next = prev + 1;
        if (next < systemsToCheck.length) {
          // Mark previous system as checked
          setCheckedSystems(prevChecked => new Set([...prevChecked, systemsToCheck[prev].id]));
          return next;
        } else {
          // All systems checked
          clearInterval(systemInterval);
          return prev;
        }
      });
    }, 6000); // Check each system for ~6 seconds (24 seconds total for 4 systems)

    // Simulate 30-second check
    const checkTimeout = setTimeout(() => {
      setIsChecking(false);
      // Mark last system as checked
      setCheckedSystems(prev => new Set([...prev, systemsToCheck[systemsToCheck.length - 1].id]));
      // Simulate evaluation - in real app, this would come from API
      // For testing: Always return partial success with 2 tasks needing recheck
      const randomResult: EvaluationResult = 'partial-success';
      setResult(randomResult);
      
      // Simulate which tasks need recheck - always 2 tasks for testing
      const allTasks: MilestoneId[] = ['living-room', 'hub', 'streaming', 'bedroom'];
      if (randomResult === 'partial-success') {
        // Always select first 2 tasks for consistent testing
        setRecheckTasks(['living-room', 'hub']);
      } else if (randomResult === 'no-success') {
        // All tasks need recheck
        setRecheckTasks(allTasks);
      }
    }, 30000); // 30 seconds

    return () => {
      clearTimeout(checkTimeout);
      clearInterval(systemInterval);
    };
  }, []);

  if (isChecking) {
    const progress = ((currentSystemIndex + 1) / systemsToCheck.length) * 100;

    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 mx-auto mb-6"
            >
              <Loader2 className="w-16 h-16 text-[#4A90E2]" />
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Checking Your Setup
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-700 mb-2">
              This might take about 30 seconds
            </p>
            
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              We're verifying that everything is working properly. Don't worry, we're always here to help!
            </p>
          </div>

          {/* Systems being checked */}
          <div className="space-y-3 mb-6">
            {systemsToCheck.map((system, index) => {
              const isCurrent = index === currentSystemIndex;
              const isChecked = checkedSystems.has(system.id);
              const isPending = index > currentSystemIndex;

              return (
                <motion.div
                  key={system.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: isCurrent ? 1.02 : 1
                  }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isChecked
                      ? 'bg-green-50 border-green-200'
                      : isCurrent
                      ? 'bg-blue-50 border-blue-300 shadow-md'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isChecked ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                          <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                        </motion.div>
                      ) : isCurrent ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Loader2 className="w-6 h-6 text-[#4A90E2] shrink-0" />
                        </motion.div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 shrink-0" />
                      )}
                      <span className={`font-medium ${
                        isChecked
                          ? 'text-green-800'
                          : isCurrent
                          ? 'text-blue-900'
                          : 'text-gray-500'
                      }`}>
                        {system.name}
                      </span>
                    </div>
                    {isChecked && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-green-700 font-medium"
                      >
                        ✓ Verified
                      </motion.span>
                    )}
                    {isCurrent && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-blue-700 font-medium"
                      >
                        Checking...
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Overall Progress indicator */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] h-2.5 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-600 text-center">
            {currentSystemIndex + 1} of {systemsToCheck.length} systems checked
          </p>
        </motion.div>
      </div>
    );
  }

  if (!result) return null;

  const resultConfig = {
    'all-success': {
      icon: CheckCircle2,
      iconColor: 'text-[#6FCF97]',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      title: "Everything is Complete! 🎉",
      subtitle: 'Congratulations!',
      message: 'All your meters are properly set up and working correctly. You\'re all set!',
      buttonText: 'Continue',
      buttonVariant: 'primary' as const
    },
    'partial-success': {
      icon: CheckCircle2,
      iconColor: 'text-[#4A90E2]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      title: 'You\'ve Done All the Hard Work! 🎉',
      subtitle: 'Let\'s do a quick check',
      message: 'You\'ve put in so much effort - amazing work! Sometimes hardware just decides not to play along. Let\'s do a quick check on a few things.',
      buttonText: 'See tasks to check',
      buttonVariant: 'primary' as const
    },
    'no-success': {
      icon: CheckCircle2,
      iconColor: 'text-[#4A90E2]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      title: 'You\'ve Done All the Hard Work! 🎉',
      subtitle: 'Let\'s do a quick check',
      message: 'You\'ve put in so much effort - amazing work! Sometimes hardware just decides not to play along. Let\'s do a quick check on everything.',
      buttonText: 'See tasks to check',
      buttonVariant: 'primary' as const
    }
  };

  const config = resultConfig[result];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <Card className={`${config.bgColor} ${config.borderColor} border-2 p-8 sm:p-12`}>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`w-20 h-20 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <IconComponent className={`w-12 h-12 ${config.iconColor}`} />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {config.title}
            </h2>

            <p className="text-xl sm:text-2xl text-gray-700 font-semibold mb-4">
              {config.subtitle}
            </p>

            <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-lg mx-auto">
              {config.message}
            </p>

            {/* Show tasks that need recheck */}
            {(result === 'partial-success' || result === 'no-success') && recheckTasks.length > 0 && (
              <div className="mb-6">
                <p className="text-base text-gray-700 mb-4 font-medium">
                  The following {recheckTasks.length} {recheckTasks.length === 1 ? 'task needs' : 'tasks need'} to be rechecked:
                </p>
                <div className="space-y-2 mb-6">
                  {recheckTasks.map((taskId) => {
                    const taskNames: Record<MilestoneId, string> = {
                      'living-room': 'Living Room Setup',
                      'hub': 'The Hub',
                      'streaming': 'Streaming Meter',
                      'bedroom': 'Bedroom TV'
                    };
                    return (
                      <div key={taskId} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200">
                        <CheckCircle2 className="w-5 h-5 text-[#4A90E2] shrink-0" />
                        <span className="text-gray-700 font-medium">{taskNames[taskId]}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Please review these tasks and then rerun the validation again.
                </p>
              </div>
            )}

            {result === 'all-success' ? (
              <Button
                onClick={() => onComplete(undefined, true)}
                variant={config.buttonVariant}
                fullWidth
                className="h-12 text-base sm:text-lg font-semibold"
              >
                {config.buttonText}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  // Pass recheck tasks to parent - onComplete will handle navigation
                  console.log('See tasks clicked - recheck tasks:', recheckTasks);
                  onComplete(recheckTasks, false);
                }}
                variant={config.buttonVariant}
                fullWidth
                className="h-12 text-base sm:text-lg font-semibold"
              >
                See tasks to check
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

