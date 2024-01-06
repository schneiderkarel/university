import React, { useContext } from 'react';
import {
  ArcElement, Chart as ChartJS, Legend, Tooltip,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { shoppingListItemType } from '../types/types';
import ThemeContext from '../context/theme.context';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
);

const ShoppingListItemsPieChart = ({ items }) => {
  const { t } = useTranslation();
  const [theme] = useContext(ThemeContext);

  const pieData = () => {
    const resolvedItems = items.filter((item) => item.resolved);
    const unresolvedItems = items.filter((item) => !item.resolved);

    return {
      labels: [`${t('ShoppingListItemsPieChart.titles.resolved')}`, t('ShoppingListItemsPieChart.titles.unresolved')],
      datasets: [
        {
          data: [resolvedItems.length, unresolvedItems.length],
          backgroundColor: [
            theme === 'light' ? 'white' : '#212529',
            theme === 'light' ? '#ECF2FF' : '#6c757d',
          ],
          borderWidth: theme === 'light' ? 1 : 1,
          borderColor: theme === 'light' ? '#6c757d' : 'white',
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: theme === 'light' ? '#28242c' : 'white',
        },
        padding: 20,
      },
    },
  };

  return <Pie data={pieData()} options={options} />;
};

ShoppingListItemsPieChart.propTypes = {
  items: PropTypes.arrayOf(shoppingListItemType().isRequired).isRequired,
};

export default ShoppingListItemsPieChart;
