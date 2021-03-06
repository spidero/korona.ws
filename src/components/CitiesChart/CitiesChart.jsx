import React, { useState } from 'react';
import { StyledBody } from 'baseui/card';
import { StyledCard } from '..';
import ContentLoader from 'react-content-loader';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Tabs, Tab } from 'baseui/tabs';

import { useData } from '../../contexts/DataContext';
import groupBy from 'lodash.groupby';
import { useStyletron } from 'baseui';

function Loader() {
  return (
    <ContentLoader
      speed={0.6}
      width={300}
      height={200}
      display={'block'}
      viewBox="0 0 300 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="20" y="6" rx="2" ry="2" width="80" height="22" />
      <rect x="110" y="6" rx="2" ry="2" width="200" height="22" />
      <rect x="40" y="40" rx="2" ry="2" width="60" height="22" />
      <rect x="110" y="40" rx="2" ry="2" width="170" height="22" />
      <rect x="30" y="74" rx="2" ry="2" width="70" height="22" />
      <rect x="110" y="74" rx="2" ry="2" width="140" height="22" />
      <rect x="20" y="108" rx="2" ry="2" width="80" height="22" />
      <rect x="110" y="108" rx="2" ry="2" width="100" height="22" />
      <rect x="50" y="142" rx="2" ry="2" width="50" height="22" />
      <rect x="110" y="142" rx="2" ry="2" width="100" height="22" />
      <rect x="40" y="176" rx="2" ry="2" width="60" height="22" />
      <rect x="110" y="176" rx="2" ry="2" width="60" height="22" />
    </ContentLoader>
  );
}

function prepareData(cases) {
  return Object
    .entries(groupBy(cases, 'city'))
    .map(([city, data]) => ({ city, count: data.length }))
    .sort((a, b) => b.count - a.count);
}

export default function CitiesChart() {
  const { cases, isLoading } = useData();
  const [activeKey, setActiveKey] = useState('0');
  const [, theme] = useStyletron();

  return (
    <StyledCard
      width={'500px'}
    >
      <StyledBody>
        <Tabs
          onChange={({ activeKey }) => {
            setActiveKey(activeKey);
          }}
          activeKey={activeKey}
        >
          <Tab title="Podział na miasta">
            {isLoading && <Loader />}
            {cases &&
              <BarChart
                width={400}
                height={200}
                data={prepareData(cases)}
                layout="vertical"
              >
                <YAxis dataKey="city" type="category" width={100} />
                <XAxis type="number" hide />
                <Tooltip 
                  formatter={value => [value, 'Liczba']}
                />
                <Bar dataKey="count" fill={theme.colors.accent} />
              </BarChart>}
          </Tab>
        </Tabs>
      </StyledBody>
    </StyledCard>
  );
}