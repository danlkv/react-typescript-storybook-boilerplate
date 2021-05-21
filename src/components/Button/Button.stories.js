import React from 'react';

import { Button } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onClick: ()=>console.log('Clicked test button'),
  label: 'Button',
};

export const Empty = Template.bind({});
Empty.args = {
  onClick: ()=>console.log('Clicked test button'),
  label: ' ',
};