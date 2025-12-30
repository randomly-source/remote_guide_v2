import React from 'react';
// Simple line art illustrations inspired by IKEA manuals
export function NanoMeterIcon({
  className = 'w-24 h-24'
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Small box device */}
      <rect x="20" y="35" width="60" height="30" rx="4" />
      <circle cx="50" cy="50" r="8" />
      {/* Cable */}
      <path d="M80 50 L90 50" />
    </svg>;
}
export function RemoteIcon({
  className = 'w-24 h-24'
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Remote shape */}
      <rect x="35" y="20" width="30" height="60" rx="4" />
      {/* Buttons */}
      <circle cx="50" cy="30" r="3" />
      <rect x="42" y="40" width="16" height="4" rx="1" />
      <rect x="42" y="48" width="16" height="4" rx="1" />
      <rect x="42" y="56" width="16" height="4" rx="1" />
    </svg>;
}
export function PowerSensorIcon({
  className = 'w-24 h-24'
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Plug head */}
      <rect x="30" y="30" width="40" height="40" rx="4" />
      {/* Prongs */}
      <path d="M40 30 L40 20" />
      <path d="M60 30 L60 20" />
      {/* Cable out */}
      <path d="M50 70 L50 85" />
    </svg>;
}
export function HubIcon({
  className = 'w-24 h-24'
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Hub body - rounded puck style */}
      <ellipse cx="50" cy="60" rx="35" ry="15" />
      <path d="M15 60 Q15 30 50 30 Q85 30 85 60" />
      {/* Light indicator */}
      <circle cx="50" cy="45" r="2" fill="currentColor" />
      {/* Antenna hint */}
      <path d="M50 30 L50 15" />
    </svg>;
}
export function StreamingMeterIcon({
  className = 'w-24 h-24'
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Flat box */}
      <rect x="20" y="40" width="60" height="20" rx="2" />
      {/* Antennae */}
      <path d="M30 40 L30 25" />
      <path d="M70 40 L70 25" />
      {/* Lights */}
      <circle cx="35" cy="50" r="1.5" fill="currentColor" />
      <circle cx="45" cy="50" r="1.5" fill="currentColor" />
      <circle cx="55" cy="50" r="1.5" fill="currentColor" />
    </svg>;
}
export function TVIcon({
  className = 'w-24 h-24'
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="15" y="25" width="70" height="45" rx="2" />
      <path d="M35 70 L30 80 H70 L65 70" />
    </svg>;
}
export function RouterIcon({
  className = 'w-24 h-24'
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 50 Q50 20 80 50" />
      <path d="M30 50 Q50 35 70 50" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
      <rect x="25" y="60" width="50" height="15" rx="2" />
    </svg>;
}