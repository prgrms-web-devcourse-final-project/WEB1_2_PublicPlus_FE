const ColorPalette = () => {
  const colorClasses = {
    primary: [
      'bg-primary',
      'bg-primary-50',
      'bg-primary-100',
      'bg-primary-200',
      'bg-primary-300',
      'bg-primary-400',
      'bg-primary-500',
      'bg-primary-600',
      'bg-primary-700',
      'bg-primary-800',
      'bg-primary-900'
    ],
    secondary: [
      'bg-secondary',
      'bg-secondary-50',
      'bg-secondary-100',
      'bg-secondary-200',
      'bg-secondary-300',
      'bg-secondary-400',
      'bg-secondary-500',
      'bg-secondary-600',
      'bg-secondary-700',
      'bg-secondary-800',
      'bg-secondary-900'
    ],
    success: [
      'bg-success',
      'bg-success-50',
      'bg-success-100',
      'bg-success-200',
      'bg-success-300',
      'bg-success-500',
      'bg-success-900'
    ],
    error: [
      'bg-error',
      'bg-error-50',
      'bg-error-100',
      'bg-error-200',
      'bg-error-300',
      'bg-error-500',
      'bg-error-900'
    ],
    warning: [
      'bg-warning',
      'bg-warning-50',
      'bg-warning-100',
      'bg-warning-200',
      'bg-warning-300',
      'bg-warning-500',
      'bg-warning-900'
    ]
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {Object.entries(colorClasses).map(([colorName, classes]) => (
        <div
          key={colorName}
          className="rounded bg-white p-4 shadow">
          <h2 className="mb-4 text-xl font-bold capitalize">
            {colorName} Colors
          </h2>
          {classes.map(cls => (
            <div
              key={cls}
              className={`${cls} mb-2 p-2 text-center text-white`}>
              {cls}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
