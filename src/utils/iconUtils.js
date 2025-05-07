import * as Icons from 'lucide-react';

const getIcon = (iconName) => {
  const IconComponent = Icons[iconName] || Icons.Smile;
  
  // Return a function that renders the icon with the given props
  const renderIcon = (props = {}) => {
    return <IconComponent {...props} />;
  };
  
  return renderIcon;
};
export default getIcon;