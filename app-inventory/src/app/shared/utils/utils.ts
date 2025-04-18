export const getArraysOfMonts = () => {
  return [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
  ];
};

export const getArraysOfOfYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => currentYear - i);
};

export const ngxChartsCongig = {
  gradient: false,
  xAxis: true,
  yAxis: true,
  showLegend: true,
  showLabels: true,
  animations: true,
};
