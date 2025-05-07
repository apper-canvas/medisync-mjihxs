import React from 'react';
import * as icons from 'lucide-react';

/**
 * Utility function to get icons from lucide-react library
 * @param {string} name - The name of the icon to retrieve
 * @returns {Function} - The icon component function
 */
export const getIcon = (name) => {
  // Handle case sensitivity - convert first letter to uppercase and rest to lowercase
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  
  // Get the icon from lucide-react
  const IconComponent = icons[formattedName] || icons.HelpCircle;
  
  // Return a function that renders the icon with given props
  return (props) => {
    return React.createElement(IconComponent, props);
  };
};
