const generateRandomColor = () => {
  const colors = [
    '#38BDF8', '#FACC15', '#EF4444',
    '#10B981', '#8B5CF6', '#EC4899',
    '#22C55E', '#F97316', '#06B6D4',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

export default generateRandomColor;